"""Monitor Allenamenti -- HA integration for workout + weight tracking."""

from __future__ import annotations

import logging
import shutil
import uuid
from datetime import datetime, timedelta
from pathlib import Path

import voluptuous as vol

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv
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
from .apple_health import parse_apple_health_export
from .gamification import calculate_points, update_streak, detect_pr
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
    await _register_frontend_card(hass)

    # Periodic: weight polling + streak check every 5 min
    async def _periodic_check(_now=None):
        await coordinator.periodic_evaluation()

    entry.async_on_unload(
        hass.helpers.event.async_track_time_interval(
            _periodic_check, timedelta(minutes=5)
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
        file_path = call.data["file_path"]
        try:
            workouts = await hass.async_add_executor_job(
                parse_apple_health_export, file_path
            )
        except (FileNotFoundError, ValueError) as err:
            _LOGGER.error("Import Apple Health fallito: %s", err)
            return

        imported = 0
        skipped = 0
        existing_dates = {
            w.get("date") for w in coordinator.state.get("workouts", [])
        }

        for w in workouts:
            # Skip duplicates: same date + type already logged
            dup_key = f"{w['date']}_{w['type']}"
            if dup_key in existing_dates:
                skipped += 1
                continue
            existing_dates.add(dup_key)

            await coordinator.log_workout(
                workout_type=w["type"],
                duration_min=w["duration_min"],
                calories=w["calories"],
                distance_km=w.get("distance_km", 0.0),
                date=w.get("date"),
                source="apple_health",
            )
            imported += 1

        _LOGGER.info(
            "Apple Health import completato: %d importati, %d duplicati saltati",
            imported, skipped,
        )

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
