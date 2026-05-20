"""Parse Apple Health export XML and extract all useful data.

Single-pass streaming parser that collects:
- Workouts (mapped to our types)
- ActivitySummary (daily Apple Watch rings)
- Sleep phases (aggregated per night)
- Resting heart rate (daily)
- VO2Max (occasional)
- HRV (daily average from multiple samples)
"""

from __future__ import annotations

import io
import logging
import zipfile
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path
from xml.etree.ElementTree import iterparse

_LOGGER = logging.getLogger(__name__)

MAX_FILE_SIZE = 512 * 1024 * 1024  # 512 MB decompressed limit

# HKWorkoutActivityType → our workout type key
HK_TYPE_MAP: dict[str, str] = {
    "HKWorkoutActivityTypeTraditionalStrengthTraining": "pesi",
    "HKWorkoutActivityTypeFunctionalStrengthTraining": "pesi",
    "HKWorkoutActivityTypeRunning": "corsa",
    "HKWorkoutActivityTypeWalking": "cammino",
    "HKWorkoutActivityTypeHiking": "cammino",
    "HKWorkoutActivityTypeHighIntensityIntervalTraining": "hiit",
    "HKWorkoutActivityTypeCrossTraining": "hiit",
    "HKWorkoutActivityTypeCoreTraining": "pesi",
    "HKWorkoutActivityTypeCycling": "corsa",
    "HKWorkoutActivityTypeSwimming": "nuoto",
}

# Record types we want to extract
_REC_RESTING_HR = "HKQuantityTypeIdentifierRestingHeartRate"
_REC_VO2MAX = "HKQuantityTypeIdentifierVO2Max"
_REC_HRV = "HKQuantityTypeIdentifierHeartRateVariabilitySDNN"
_REC_SLEEP = "HKCategoryTypeIdentifierSleepAnalysis"

# WorkoutStatistics types
_ENERGY_TYPE = "HKQuantityTypeIdentifierActiveEnergyBurned"
_DISTANCE_TYPES = frozenset({
    "HKQuantityTypeIdentifierDistanceWalkingRunning",
    "HKQuantityTypeIdentifierDistanceCycling",
    "HKQuantityTypeIdentifierDistanceSwimming",
})

# Tags that are children of Workout — don't clear before parent
_WORKOUT_CHILD_TAGS = frozenset({
    "WorkoutStatistics", "WorkoutEvent", "WorkoutRoute", "MetadataEntry",
})

# Sleep phases we care about
_SLEEP_PHASES = {
    "HKCategoryValueSleepAnalysisAsleepCore": "core",
    "HKCategoryValueSleepAnalysisAsleepDeep": "deep",
    "HKCategoryValueSleepAnalysisAsleepREM": "rem",
    "HKCategoryValueSleepAnalysisAwake": "awake",
}


def _safe_float(val: str | None, fallback: float = 0.0) -> float:
    if not val:
        return fallback
    try:
        return float(val)
    except (ValueError, TypeError):
        return fallback


# ---------------------------------------------------------------------------
#  Public API
# ---------------------------------------------------------------------------

def parse_apple_health_export(file_path: str) -> list[dict]:
    """Parse workouts only (legacy service, backward compat)."""
    result = parse_apple_health_full(file_path=file_path)
    return result["workouts"]


def parse_apple_health_bytes(data: bytes, filename: str) -> dict:
    """Parse full Apple Health export from raw bytes (browser upload).

    Returns dict with all extracted data types.
    """
    return parse_apple_health_full(raw_data=data, raw_filename=filename)


def parse_apple_health_full(
    *,
    file_path: str | None = None,
    raw_data: bytes | None = None,
    raw_filename: str | None = None,
) -> dict:
    """Parse a full Apple Health export. Accepts either a file path or raw bytes."""
    if raw_data is not None:
        filename = (raw_filename or "").lower()
        if len(raw_data) > MAX_FILE_SIZE:
            raise ValueError(
                f"File troppo grande: {len(raw_data) / 1024 / 1024:.0f} MB "
                f"(limite: {MAX_FILE_SIZE / 1024 / 1024:.0f} MB)"
            )
        if filename.endswith(".zip"):
            return _parse_zip_stream(io.BytesIO(raw_data))
        elif filename.endswith(".xml"):
            return _parse_xml_stream(io.BytesIO(raw_data))
        else:
            raise ValueError("Formato non supportato: usa .xml o .zip")
    elif file_path is not None:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"File non trovato: {file_path}")
        if path.suffix == ".zip":
            with zipfile.ZipFile(path, "r") as zf:
                return _open_and_parse_zip(zf)
        elif path.suffix == ".xml":
            if path.stat().st_size > MAX_FILE_SIZE:
                raise ValueError("File XML troppo grande")
            with open(path, "rb") as f:
                return _parse_xml_stream(f)
        else:
            raise ValueError(f"Formato non supportato: {path.suffix}")
    else:
        raise ValueError("Specificare file_path o raw_data")


# ---------------------------------------------------------------------------
#  ZIP handling
# ---------------------------------------------------------------------------

def _find_health_xml(names: list[str]) -> str | None:
    """Pick the main Apple Health data XML, skipping CDA."""
    candidates = [
        n for n in names
        if n.endswith(".xml") and "cda" not in n.lower()
    ]
    if candidates:
        return candidates[0]
    xml_all = [n for n in names if n.endswith(".xml")]
    return xml_all[0] if xml_all else None


def _parse_zip_stream(buf: io.BytesIO) -> dict:
    with zipfile.ZipFile(buf, "r") as zf:
        return _open_and_parse_zip(zf)


def _open_and_parse_zip(zf: zipfile.ZipFile) -> dict:
    xml_name = _find_health_xml(zf.namelist())
    if not xml_name:
        raise FileNotFoundError("Nessun file XML trovato nello zip")

    info = zf.getinfo(xml_name)
    if info.file_size > MAX_FILE_SIZE:
        raise ValueError(
            f"File XML troppo grande: {info.file_size / 1024 / 1024:.0f} MB"
        )
    _LOGGER.info("Apple Health: parsing %s (%d MB)", xml_name, info.file_size // (1024 * 1024))
    with zf.open(xml_name) as xml_file:
        return _parse_xml_stream(xml_file)


# ---------------------------------------------------------------------------
#  Core single-pass XML parser
# ---------------------------------------------------------------------------

def _parse_xml_stream(xml_stream) -> dict:
    """Single-pass streaming parse of the entire Apple Health XML."""
    workouts: list[dict] = []
    activity_summaries: list[dict] = []
    resting_hr: list[dict] = []
    vo2max: list[dict] = []
    hrv_raw: list[tuple[str, float]] = []       # (date, value_ms)
    sleep_segments: list[tuple[str, str, float]] = []  # (night, phase, minutes)

    for event, elem in iterparse(xml_stream, events=("end",)):
        tag = elem.tag

        # -- Workout children: preserve for parent --
        if tag in _WORKOUT_CHILD_TAGS:
            continue

        # -- Workout --
        if tag == "Workout":
            w = _extract_workout(elem)
            if w:
                workouts.append(w)
            elem.clear()
            continue

        # -- ActivitySummary --
        if tag == "ActivitySummary":
            activity_summaries.append({
                "date": elem.get("dateComponents", ""),
                "active_energy": _safe_float(elem.get("activeEnergyBurned")),
                "active_energy_goal": _safe_float(elem.get("activeEnergyBurnedGoal")),
                "exercise_min": _safe_float(elem.get("appleExerciseTime")),
                "exercise_goal": _safe_float(elem.get("appleExerciseTimeGoal")),
                "stand_hours": _safe_float(elem.get("appleStandHours")),
                "stand_goal": _safe_float(elem.get("appleStandHoursGoal")),
            })
            elem.clear()
            continue

        # -- Record (various health metrics) --
        if tag == "Record":
            rtype = elem.get("type", "")

            if rtype == _REC_RESTING_HR:
                resting_hr.append({
                    "date": elem.get("startDate", "")[:10],
                    "bpm": round(_safe_float(elem.get("value"))),
                })

            elif rtype == _REC_VO2MAX:
                vo2max.append({
                    "date": elem.get("startDate", "")[:10],
                    "value": round(_safe_float(elem.get("value")), 1),
                })

            elif rtype == _REC_HRV:
                date = elem.get("startDate", "")[:10]
                val = _safe_float(elem.get("value"))
                if val > 0:
                    hrv_raw.append((date, val))

            elif rtype == _REC_SLEEP:
                phase_key = _SLEEP_PHASES.get(elem.get("value", ""))
                if phase_key:
                    start_str = elem.get("startDate", "")[:19]
                    end_str = elem.get("endDate", "")[:19]
                    try:
                        s = datetime.strptime(start_str, "%Y-%m-%d %H:%M:%S")
                        e = datetime.strptime(end_str, "%Y-%m-%d %H:%M:%S")
                        dur_min = (e - s).total_seconds() / 60
                        if dur_min > 0:
                            # Night key: subtract 12h so 2am → previous day's night
                            night = (s - timedelta(hours=12)).date().isoformat()
                            sleep_segments.append((night, phase_key, dur_min))
                    except (ValueError, TypeError):
                        pass

            elem.clear()
            continue

        # Everything else: free memory
        elem.clear()

    # -- Post-process --

    # Aggregate HRV to daily averages
    hrv_by_day: dict[str, list[float]] = defaultdict(list)
    for date, val in hrv_raw:
        hrv_by_day[date].append(val)
    hrv_daily = sorted(
        [
            {"date": d, "value_ms": round(sum(vals) / len(vals), 1)}
            for d, vals in hrv_by_day.items()
        ],
        key=lambda x: x["date"],
    )

    # Aggregate sleep segments into nightly summaries
    nights: dict[str, dict[str, float]] = defaultdict(
        lambda: {"core": 0, "deep": 0, "rem": 0, "awake": 0}
    )
    for night, phase, dur in sleep_segments:
        nights[night][phase] += dur
    sleep_history = sorted(
        [
            {
                "date": d,
                "core_min": round(p["core"]),
                "deep_min": round(p["deep"]),
                "rem_min": round(p["rem"]),
                "awake_min": round(p["awake"]),
                "total_min": round(p["core"] + p["deep"] + p["rem"]),
            }
            for d, p in nights.items()
            if (p["core"] + p["deep"] + p["rem"]) > 0  # skip nights with only "awake"
        ],
        key=lambda x: x["date"],
    )

    # Dedup resting HR / VO2Max by date (keep last per day)
    resting_hr = _dedup_by_date(resting_hr)
    vo2max = _dedup_by_date(vo2max)

    _LOGGER.info(
        "Apple Health import: %d workout, %d activity days, %d sleep nights, "
        "%d resting HR, %d VO2Max, %d HRV days",
        len(workouts), len(activity_summaries), len(sleep_history),
        len(resting_hr), len(vo2max), len(hrv_daily),
    )

    return {
        "workouts": workouts,
        "activity_summaries": activity_summaries,
        "sleep_history": sleep_history,
        "resting_hr": resting_hr,
        "vo2max": vo2max,
        "hrv_daily": hrv_daily,
    }


def _dedup_by_date(records: list[dict]) -> list[dict]:
    """Keep last record per date."""
    by_date: dict[str, dict] = {}
    for r in records:
        by_date[r["date"]] = r
    return sorted(by_date.values(), key=lambda x: x["date"])


# ---------------------------------------------------------------------------
#  Workout extraction
# ---------------------------------------------------------------------------

def _extract_workout(elem) -> dict | None:
    """Extract a single workout from a Workout XML element."""
    hk_type = elem.get("workoutActivityType", "")
    our_type = HK_TYPE_MAP.get(hk_type)
    if our_type is None:
        _LOGGER.debug("Tipo allenamento non mappato, skip: %s", hk_type)
        return None

    duration = _safe_float(elem.get("duration"))

    # Calories/distance: try direct attributes first (older iOS),
    # then fall back to WorkoutStatistics children (iOS 16+)
    calories = _safe_float(elem.get("totalEnergyBurned"))
    distance = _safe_float(elem.get("totalDistance"))

    for stat in elem.findall("WorkoutStatistics"):
        stat_type = stat.get("type", "")
        if stat_type == _ENERGY_TYPE and calories == 0:
            calories = _safe_float(stat.get("sum"))
        elif stat_type in _DISTANCE_TYPES and distance == 0:
            distance = _safe_float(stat.get("sum"))

    start_date = elem.get("startDate", "")
    date_iso = start_date[:10] if len(start_date) >= 10 else ""

    return {
        "type": our_type,
        "duration_min": round(duration, 1),
        "calories": round(calories, 0),
        "distance_km": round(distance, 2),
        "date": date_iso,
        "source": "apple_health",
    }
