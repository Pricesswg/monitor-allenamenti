"""Parse Apple Health export XML and extract workouts."""

from __future__ import annotations

import io
import logging
import zipfile
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
}


def parse_apple_health_export(file_path: str) -> list[dict]:
    """Parse an Apple Health export file (.xml or .zip).

    Returns a list of workout dicts ready for log_workout().
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File non trovato: {file_path}")

    if path.suffix == ".zip":
        return _parse_from_zip(path)
    elif path.suffix == ".xml":
        return _parse_xml(path)
    else:
        raise ValueError(f"Formato non supportato: {path.suffix} (usa .xml o .zip)")


def _parse_from_zip(zip_path: Path) -> list[dict]:
    """Extract and parse XML from Apple Health zip export."""
    with zipfile.ZipFile(zip_path, "r") as zf:
        xml_name = _find_health_xml(zf.namelist())
        if not xml_name:
            raise FileNotFoundError("Nessun file XML trovato nello zip")

        info = zf.getinfo(xml_name)
        if info.file_size > MAX_FILE_SIZE:
            raise ValueError(
                f"File XML troppo grande: {info.file_size / 1024 / 1024:.0f} MB "
                f"(limite: {MAX_FILE_SIZE / 1024 / 1024:.0f} MB)"
            )

        _LOGGER.info("Apple Health: parsing %s (%d MB)", xml_name, info.file_size // (1024*1024))
        with zf.open(xml_name) as xml_file:
            return _iter_workouts(xml_file)


def _parse_xml(xml_path: Path) -> list[dict]:
    """Parse a standalone XML export file."""
    if xml_path.stat().st_size > MAX_FILE_SIZE:
        raise ValueError(
            f"File XML troppo grande: {xml_path.stat().st_size / 1024 / 1024:.0f} MB "
            f"(limite: {MAX_FILE_SIZE / 1024 / 1024:.0f} MB)"
        )
    with open(xml_path, "rb") as f:
        return _iter_workouts(f)


def _find_health_xml(names: list[str]) -> str | None:
    """Pick the main Apple Health data XML from a zip's file list.

    Skips CDA and other non-data files.  Handles both English and
    Italian export names ('export.xml', 'dati esportati.xml', etc.).
    """
    # Prefer the largest XML that is NOT the CDA file
    candidates = [
        n for n in names
        if n.endswith(".xml") and "cda" not in n.lower()
    ]
    if candidates:
        return candidates[0]
    # Fallback: any XML at all
    xml_all = [n for n in names if n.endswith(".xml")]
    return xml_all[0] if xml_all else None


def parse_apple_health_bytes(data: bytes, filename: str) -> list[dict]:
    """Parse Apple Health export from raw bytes (browser upload)."""
    if len(data) > MAX_FILE_SIZE:
        raise ValueError(
            f"File troppo grande: {len(data) / 1024 / 1024:.0f} MB "
            f"(limite: {MAX_FILE_SIZE / 1024 / 1024:.0f} MB)"
        )

    if filename.endswith(".zip"):
        buf = io.BytesIO(data)
        with zipfile.ZipFile(buf, "r") as zf:
            xml_name = _find_health_xml(zf.namelist())
            if not xml_name:
                raise FileNotFoundError("Nessun file XML trovato nello zip")

            info = zf.getinfo(xml_name)
            if info.file_size > MAX_FILE_SIZE:
                raise ValueError(
                    f"File XML troppo grande: {info.file_size / 1024 / 1024:.0f} MB "
                    f"(limite: {MAX_FILE_SIZE / 1024 / 1024:.0f} MB)"
                )
            _LOGGER.info("Apple Health: parsing %s (%d MB)", xml_name, info.file_size // (1024*1024))
            with zf.open(xml_name) as xml_file:
                return _iter_workouts(xml_file)
    elif filename.endswith(".xml"):
        return _iter_workouts(io.BytesIO(data))
    else:
        raise ValueError(f"Formato non supportato: usa .xml o .zip")


def _safe_float(val: str | None, fallback: float = 0.0) -> float:
    if not val:
        return fallback
    try:
        return float(val)
    except (ValueError, TypeError):
        return fallback


# Tags that are children of Workout — don't clear them before
# the parent Workout end event fires, or their attributes are lost.
_WORKOUT_CHILD_TAGS = frozenset({
    "WorkoutStatistics", "WorkoutEvent", "WorkoutRoute", "MetadataEntry",
})

# WorkoutStatistics types we care about
_ENERGY_TYPE = "HKQuantityTypeIdentifierActiveEnergyBurned"
_DISTANCE_TYPES = frozenset({
    "HKQuantityTypeIdentifierDistanceWalkingRunning",
    "HKQuantityTypeIdentifierDistanceCycling",
    "HKQuantityTypeIdentifierDistanceSwimming",
})


def _iter_workouts(xml_stream) -> list[dict]:
    """Stream-parse XML and extract Workout elements."""
    workouts = []

    for event, elem in iterparse(xml_stream, events=("end",)):
        if elem.tag in _WORKOUT_CHILD_TAGS:
            # Preserve children so Workout can read them
            continue

        if elem.tag != "Workout":
            elem.clear()
            continue

        hk_type = elem.get("workoutActivityType", "")
        our_type = HK_TYPE_MAP.get(hk_type)

        if our_type is None:
            _LOGGER.debug("Tipo allenamento non mappato, skip: %s", hk_type)
            elem.clear()
            continue

        duration = _safe_float(elem.get("duration"))

        # Calories/distance: try direct attributes first (older iOS),
        # then fall back to WorkoutStatistics child elements (iOS 16+)
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

        workout = {
            "type": our_type,
            "duration_min": round(duration, 1),
            "calories": round(calories, 0),
            "distance_km": round(distance, 2),
            "date": date_iso,
            "source": "apple_health",
        }
        workouts.append(workout)
        elem.clear()

    _LOGGER.info(
        "Apple Health import: %d allenamenti trovati (%d tipi supportati)",
        len(workouts),
        len({w["type"] for w in workouts}),
    )
    return workouts
