"""Monitor Allenamenti -- HA integration for workout + weight tracking."""

from __future__ import annotations

import logging
import shutil
import uuid
from datetime import datetime, timedelta
from pathlib import Path

import voluptuous as vol
from aiohttp import web

from homeassistant.components import websocket_api
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import (
    DOMAIN,
    VERSION,
    STORAGE_KEY,
    STORAGE_VERSION,
    WORKOUT_TYPES,
    EVENT_WORKOUT_LOGGED,
    EVENT_PR_ACHIEVED,
    SERVICE_LOG_WORKOUT,
    SERVICE_IMPORT_APPLE_HEALTH,
)
from .apple_health import parse_apple_health_export, parse_apple_health_bytes
from .gamification import calculate_points, update_streak, detect_pr  # noqa: F401
from .models import default_state

_LOGGER = logging.getLogger(__name__)

PLATFORMS = [Platform.SENSOR]

CARD_URL = f"/{DOMAIN}_static/monitor-allenamenti-card.js"
_CARD_REGISTERED_FLAG = f"{DOMAIN}_card_registered"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Monitor Allenamenti from a config entry."""
    coordinator = MonitorAllenamentiCoordinator(hass, entry)
    await coordinator.async_load()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    _register_services(hass, coordinator)
    _register_websocket_api(hass)
    hass.http.register_view(AppleHealthUploadView)
    await _register_frontend_card(hass)

    # Periodic: weight polling + streak check every 5 min
    async def _periodic_check(_now=None):
        await coordinator.periodic_evaluation()

    entry.async_on_unload(
        async_track_time_interval(
            hass, _periodic_check, timedelta(minutes=5)
        )
    )

    return True


async def _register_frontend_card(hass: HomeAssistant) -> None:
    """Register the Lovelace card JS bundle as a frontend resource."""
    src = Path(__file__).parent / "www" / "monitor-allenamenti-card.js"
    if not src.exists():
        _LOGGER.error(
            "Monitor Allenamenti card bundle NOT FOUND at %s. "
            "Run: cd monitor-card && npm run build",
            src,
        )
        return

    # Copy bundle to /config/www/ for Lovelace resource loading
    dst_dir = Path(hass.config.path("www"))
    dst = dst_dir / "monitor-allenamenti-card.js"

    def _sync_bundle() -> bool:
        dst_dir.mkdir(parents=True, exist_ok=True)
        if not (dst.exists() and dst.stat().st_size == src.stat().st_size and dst.read_bytes() == src.read_bytes()):
            shutil.copy2(src, dst)
            return True
        return False

    try:
        copied = await hass.async_add_executor_job(_sync_bundle)
        if copied:
            _LOGGER.info("Monitor Allenamenti: bundle sincronizzato in %s", dst)
    except Exception:
        _LOGGER.exception("Monitor Allenamenti: errore copiando bundle in /config/www/")

    # Fallback: static path + add_extra_js_url
    if not hass.data.get(_CARD_REGISTERED_FLAG):
        try:
            await hass.http.async_register_static_paths([
                StaticPathConfig(CARD_URL, str(src), False)
            ])
            add_extra_js_url(hass, f"{CARD_URL}?v={VERSION}")
            _LOGGER.info("Monitor Allenamenti: static path attivo su %s?v=%s", CARD_URL, VERSION)
        except Exception:
            _LOGGER.warning("Monitor Allenamenti: static path non disponibile", exc_info=True)
        hass.data[_CARD_REGISTERED_FLAG] = True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return unload_ok


_WS_REGISTERED_FLAG = f"{DOMAIN}_ws_registered"


def _register_websocket_api(hass: HomeAssistant) -> None:
    """Register WebSocket commands (once)."""
    if hass.data.get(_WS_REGISTERED_FLAG):
        return
    hass.data[_WS_REGISTERED_FLAG] = True

    @websocket_api.websocket_command(
        {vol.Required("type"): f"{DOMAIN}/get_state"}
    )
    @websocket_api.async_response
    async def ws_get_state(hass, connection, msg):
        for coordinator in hass.data.get(DOMAIN, {}).values():
            if not isinstance(coordinator, MonitorAllenamentiCoordinator):
                continue
            state = coordinator.state
            connection.send_result(msg["id"], {
                "workouts": (state.get("workouts") or [])[-100:],
                "weight_history": state.get("weight_history") or [],
                "points_total": state.get("points_total", 0),
                "streak": state.get("streak", 0),
                "streak_best": state.get("streak_best", 0),
                "personal_records": state.get("personal_records", {}),
                "last_workout_date": state.get("last_workout_date"),
                "activity_summaries": (state.get("activity_summaries") or [])[-90:],
                "sleep_history": (state.get("sleep_history") or [])[-90:],
                "resting_hr": (state.get("resting_hr") or [])[-90:],
                "vo2max": state.get("vo2max") or [],
                "hrv_daily": (state.get("hrv_daily") or [])[-90:],
            })
            return
        connection.send_result(msg["id"], {})

    websocket_api.async_register_command(hass, ws_get_state)


def _register_services(hass: HomeAssistant, coordinator: MonitorAllenamentiCoordinator):
    """Register services."""

    async def handle_log_workout(call: ServiceCall):
        workout_type = call.data["type"]
        duration_min = call.data["duration_min"]
        calories = call.data["calories"]
        distance_km = call.data.get("distance_km", 0.0)
        volume_kg = call.data.get("volume_kg", 0.0)
        sets = call.data.get("sets", 0)
        date = call.data.get("date", datetime.now().isoformat())
        source = call.data.get("source", "apple_health")

        await coordinator.log_workout(
            workout_type=workout_type,
            duration_min=duration_min,
            calories=calories,
            distance_km=distance_km,
            volume_kg=volume_kg,
            sets=sets,
            date=date,
            source=source,
        )

    async def handle_import_apple_health(call: ServiceCall):
        """Service-call variant: read file from disk, then bulk-merge."""
        from functools import partial
        from .apple_health import parse_apple_health_full
        file_path = call.data["file_path"]
        try:
            parsed = await hass.async_add_executor_job(
                partial(parse_apple_health_full, file_path=file_path)
            )
        except (FileNotFoundError, ValueError) as err:
            _LOGGER.error("Import Apple Health fallito: %s", err)
            return

        result = await coordinator.merge_health_data(parsed)
        _LOGGER.info("Apple Health import completato: %s", result)

    hass.services.async_register(
        DOMAIN,
        SERVICE_LOG_WORKOUT,
        handle_log_workout,
        schema=vol.Schema(
            {
                vol.Required("type"): vol.In(list(WORKOUT_TYPES.keys())),
                vol.Required("duration_min"): vol.Coerce(float),
                vol.Required("calories"): vol.Coerce(float),
                vol.Optional("distance_km", default=0.0): vol.Coerce(float),
                vol.Optional("volume_kg", default=0.0): vol.Coerce(float),
                vol.Optional("sets", default=0): vol.Coerce(int),
                vol.Optional("date"): cv.string,
                vol.Optional("source", default="apple_health"): cv.string,
            }
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_IMPORT_APPLE_HEALTH,
        handle_import_apple_health,
        schema=vol.Schema(
            {vol.Required("file_path"): cv.string}
        ),
    )


class AppleHealthUploadView(HomeAssistantView):
    """Handle Apple Health file uploads via HTTP POST."""

    url = f"/api/{DOMAIN}/upload"
    name = f"api:{DOMAIN}:upload"
    requires_auth = True

    async def post(self, request: web.Request) -> web.Response:
        hass = request.app["hass"]

        coordinator = None
        for c in hass.data.get(DOMAIN, {}).values():
            if isinstance(c, MonitorAllenamentiCoordinator):
                coordinator = c
                break
        if not coordinator:
            return self.json({"error": "Integrazione non pronta"}, status_code=503)

        try:
            reader = await request.multipart()
            field = await reader.next()
            if not field or field.name != "file":
                return self.json({"error": "Nessun file ricevuto"}, status_code=400)

            filename = (field.filename or "export.xml").lower()
            chunks = []
            total = 0
            while True:
                chunk = await field.read_chunk(1024 * 1024)
                if not chunk:
                    break
                total += len(chunk)
                if total > 512 * 1024 * 1024:
                    return self.json({"error": "File troppo grande (max 512 MB)"}, status_code=413)
                chunks.append(chunk)

            raw = b"".join(chunks)
        except Exception as err:
            _LOGGER.error("Upload read error: %s", err)
            return self.json({"error": "Errore lettura file"}, status_code=400)

        # Sanity check: validate magic bytes match declared extension
        if filename.endswith(".zip") and not raw.startswith(b"PK"):
            return self.json({"error": "Il file non sembra uno ZIP valido"}, status_code=422)
        if filename.endswith(".xml") and not raw.lstrip()[:5] == b"<?xml":
            # Be lenient: some exports may not have XML declaration
            stripped = raw.lstrip()
            if not (stripped.startswith(b"<") or stripped.startswith(b"<?xml")):
                return self.json({"error": "Il file non sembra un XML valido"}, status_code=422)

        try:
            parsed = await hass.async_add_executor_job(
                parse_apple_health_bytes, raw, filename
            )
        except (FileNotFoundError, ValueError) as err:
            return self.json({"error": str(err)}, status_code=422)
        except Exception as err:
            _LOGGER.exception("Parse error")
            return self.json({"error": f"Errore parsing: {err}"}, status_code=500)

        result = await coordinator.merge_health_data(parsed)
        return self.json(result)


class MonitorAllenamentiCoordinator:
    """Central coordinator for state management."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._state: dict = {}
        self._listeners: list = []

    @property
    def state(self) -> dict:
        return self._state

    def register_listener(self, callback) -> None:
        self._listeners.append(callback)

    def unregister_listener(self, callback) -> None:
        self._listeners = [cb for cb in self._listeners if cb != callback]

    def _notify_listeners(self) -> None:
        for listener in self._listeners:
            self.hass.async_create_task(listener())

    async def async_load(self) -> None:
        """Load state from storage or create default."""
        stored = await self._store.async_load()
        if stored:
            self._state = stored
        else:
            self._state = default_state()
            await self._save()

    async def _save(self) -> None:
        await self._store.async_save(self._state)
        self._notify_listeners()

    # --- Withings ---

    def _read_withings(self) -> dict:
        """Read current Withings sensor values from HA."""
        from .const import (
            WITHINGS_PESO,
            WITHINGS_ALTEZZA,
            WITHINGS_OBIETTIVO_PESO,
            WITHINGS_PASSI_OGGI,
            WITHINGS_CALORIE_ATTIVE,
            WITHINGS_CALORIE_TOTALI,
            WITHINGS_DISTANZA_OGGI,
            WITHINGS_ATTIVITA_INTENSA,
            WITHINGS_ATTIVITA_LEGGERA,
            WITHINGS_ATTIVITA_MODERATA,
            WITHINGS_TEMPO_ATTIVITA,
            WITHINGS_ELEVAZIONE,
        )

        mapping = {
            "weight": WITHINGS_PESO,
            "height": WITHINGS_ALTEZZA,
            "weight_goal": WITHINGS_OBIETTIVO_PESO,
            "steps": WITHINGS_PASSI_OGGI,
            "calories_active": WITHINGS_CALORIE_ATTIVE,
            "calories_total": WITHINGS_CALORIE_TOTALI,
            "distance": WITHINGS_DISTANZA_OGGI,
            "activity_intense": WITHINGS_ATTIVITA_INTENSA,
            "activity_light": WITHINGS_ATTIVITA_LEGGERA,
            "activity_moderate": WITHINGS_ATTIVITA_MODERATA,
            "activity_time": WITHINGS_TEMPO_ATTIVITA,
            "elevation": WITHINGS_ELEVAZIONE,
        }
        data = {}
        for key, entity_id in mapping.items():
            ha_state = self.hass.states.get(entity_id)
            if ha_state and ha_state.state not in ("unknown", "unavailable"):
                try:
                    data[key] = float(ha_state.state)
                except (ValueError, TypeError):
                    data[key] = None
            else:
                data[key] = None
        return data

    # --- Log workout ---

    async def log_workout(
        self,
        workout_type: str,
        duration_min: float,
        calories: float,
        distance_km: float = 0.0,
        volume_kg: float = 0.0,
        sets: int = 0,
        date: str | None = None,
        source: str = "apple_health",
    ) -> None:
        """Log a completed workout."""
        if date is None:
            date = datetime.now().isoformat()

        points = calculate_points(workout_type)

        workout = {
            "id": str(uuid.uuid4()),
            "date": date,
            "type": workout_type,
            "duration_min": duration_min,
            "calories": calories,
            "distance_km": distance_km,
            "volume_kg": volume_kg,
            "sets": sets,
            "points": points,
            "source": source,
        }

        self._state.setdefault("workouts", []).append(workout)
        self._state["points_total"] = self._state.get("points_total", 0) + points

        # Streak
        update_streak(self._state, date)
        self._state["last_workout_date"] = date

        # PR detection
        pr = detect_pr(self._state, workout)
        if pr:
            self.hass.bus.async_fire(EVENT_PR_ACHIEVED, pr)

        self.hass.bus.async_fire(EVENT_WORKOUT_LOGGED, {
            "type": workout_type,
            "duration_min": duration_min,
            "calories": calories,
            "points": points,
        })

        await self._save()
        _LOGGER.info("Workout logged: %s (%d pt)", workout_type, points)

    # --- Bulk import from Apple Health ---

    async def merge_health_data(self, parsed: dict) -> dict:
        """Merge parsed Apple Health data into state with deduplication.

        Bulk import: no per-workout events, single save at end, streak/PR
        recalculated from full history (not from XML iteration order).
        Returns summary of imported/skipped counts per data type.
        """
        result = {}

        # -- Workouts (dedup by date+type) --
        existing_wk: list[dict] = self._state.setdefault("workouts", [])
        existing_keys = {
            f"{w.get('date')}_{w.get('type')}"
            for w in existing_wk
        }
        imported_wk = 0
        points_added = 0
        for w in parsed.get("workouts", []):
            dup_key = f"{w['date']}_{w['type']}"
            if dup_key in existing_keys:
                continue
            existing_keys.add(dup_key)

            points = calculate_points(w["type"])
            existing_wk.append({
                "id": str(uuid.uuid4()),
                "date": w["date"],
                "type": w["type"],
                "duration_min": w["duration_min"],
                "calories": w["calories"],
                "distance_km": w.get("distance_km", 0.0),
                "volume_kg": 0.0,
                "sets": 0,
                "points": points,
                "source": "apple_health",
            })
            points_added += points
            imported_wk += 1
        result["workouts"] = imported_wk
        self._state["points_total"] = self._state.get("points_total", 0) + points_added

        # Rebuild PRs and streak from full history (no events emitted)
        if imported_wk > 0:
            self._recalc_personal_records()
            self._recalc_streak()

        # -- Merge date-keyed lists (dedup by date, sort once) --
        health_keys = [
            "activity_summaries",
            "sleep_history",
            "resting_hr",
            "vo2max",
            "hrv_daily",
        ]
        for key in health_keys:
            new_records = parsed.get(key, [])
            if not new_records:
                result[key] = 0
                continue

            existing = self._state.setdefault(key, [])
            existing_dates = {r["date"] for r in existing}
            added = 0
            for r in new_records:
                if r["date"] not in existing_dates:
                    existing.append(r)
                    existing_dates.add(r["date"])
                    added += 1

            existing.sort(key=lambda x: x["date"])
            result[key] = added

        # Single save at the end
        await self._save()
        _LOGGER.info("Apple Health merge: %s", result)
        return result

    def _recalc_personal_records(self) -> None:
        """Rebuild personal_records from the full workout history."""
        prs: dict[str, float] = {}
        for w in self._state.get("workouts", []):
            wtype = w.get("type", "")
            if not wtype:
                continue
            for metric in ("duration_min", "calories", "distance_km", "volume_kg"):
                val = w.get(metric, 0) or 0
                if val > 0:
                    key = f"{wtype}_{metric}"
                    if val > prs.get(key, 0):
                        prs[key] = val
        self._state["personal_records"] = prs

    def _recalc_streak(self) -> None:
        """Recompute current streak from full workout history.

        Walks unique workout dates backwards, counting consecutive days.
        """
        workouts = self._state.get("workouts", [])
        # Unique day-precision dates
        dates_set = set()
        for w in workouts:
            d = (w.get("date") or "")[:10]
            if len(d) == 10:
                dates_set.add(d)

        if not dates_set:
            self._state["streak"] = 0
            self._state["last_workout_date"] = None
            return

        dates = sorted(dates_set)
        last_date_str = dates[-1]
        try:
            last_date = datetime.fromisoformat(last_date_str).date()
        except ValueError:
            return

        streak = 1
        prev = last_date
        for d in reversed(dates[:-1]):
            try:
                dt = datetime.fromisoformat(d).date()
            except ValueError:
                continue
            gap = (prev - dt).days
            if gap == 1:
                streak += 1
                prev = dt
            else:
                break

        self._state["streak"] = streak
        self._state["streak_best"] = max(self._state.get("streak_best", 0), streak)
        self._state["last_workout_date"] = last_date_str

    # --- Periodic ---

    async def periodic_evaluation(self) -> None:
        """Periodic: poll Withings weight, check streak."""
        withings = self._read_withings()
        changed = False

        # Weight tracking
        if withings.get("weight") is not None:
            weight = withings["weight"]
            history = self._state.get("weight_history", [])
            today = datetime.now().date().isoformat()

            # Only record once per day
            if not history or not history[-1].get("date", "").startswith(today):
                history.append(
                    {
                        "date": today,
                        "weight": weight,
                        "fat_ratio": withings.get("fat_ratio"),
                        "muscle_mass": withings.get("muscle_mass"),
                        "body_water": withings.get("body_water"),
                    }
                )
                # Keep last 365 days
                self._state["weight_history"] = history[-365:]
                changed = True

        # Streak decay: if no workout for > 1 day, reset streak
        last_date = self._state.get("last_workout_date")
        if last_date:
            try:
                last_dt = datetime.fromisoformat(last_date).date()
                days_since = (datetime.now().date() - last_dt).days
                if days_since > 1 and self._state.get("streak", 0) > 0:
                    self._state["streak"] = 0
                    changed = True
            except (ValueError, TypeError):
                pass

        if changed:
            await self._save()
