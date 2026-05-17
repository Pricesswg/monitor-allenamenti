"""Sensor platform for Monitor Allenamenti."""

from __future__ import annotations

from datetime import datetime

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Monitor Allenamenti sensors."""
    coordinator = hass.data[DOMAIN][entry.entry_id]

    sensors = [
        PuntiSensor(coordinator, entry),
        StreakSensor(coordinator, entry),
        StreakBestSensor(coordinator, entry),
        UltimoAllenamentoSensor(coordinator, entry),
        AllenamentiMeseSensor(coordinator, entry),
    ]

    async_add_entities(sensors)


class MonitorAllenamentiSensorBase(SensorEntity):
    """Base class for Monitor Allenamenti sensors."""

    _attr_has_entity_name = True

    def __init__(self, coordinator, entry: ConfigEntry) -> None:
        self._coordinator = coordinator
        self._entry = entry
        self._attr_device_info = {
            "identifiers": {(DOMAIN, entry.entry_id)},
            "name": "Monitor Allenamenti",
            "manufacturer": "Monitor Allenamenti",
            "model": "Workout Tracker",
        }

    @property
    def state_data(self) -> dict:
        return self._coordinator.state

    @property
    def available(self) -> bool:
        return self._coordinator.state is not None

    async def async_added_to_hass(self) -> None:
        self._coordinator.register_listener(self.async_write_ha_state)

    async def async_will_remove_from_hass(self) -> None:
        self._coordinator.unregister_listener(self.async_write_ha_state)


class PuntiSensor(MonitorAllenamentiSensorBase):
    _attr_name = "Punti"
    _attr_icon = "mdi:star-circle"
    _attr_native_unit_of_measurement = "pt"

    @property
    def unique_id(self) -> str:
        return f"{self._entry.entry_id}_punti"

    @property
    def native_value(self):
        return self.state_data.get("points_total", 0)


class StreakSensor(MonitorAllenamentiSensorBase):
    _attr_name = "Streak"
    _attr_icon = "mdi:fire"
    _attr_native_unit_of_measurement = "giorni"

    @property
    def unique_id(self) -> str:
        return f"{self._entry.entry_id}_streak"

    @property
    def native_value(self):
        return self.state_data.get("streak", 0)


class StreakBestSensor(MonitorAllenamentiSensorBase):
    _attr_name = "Streak Best"
    _attr_icon = "mdi:trophy"
    _attr_native_unit_of_measurement = "giorni"

    @property
    def unique_id(self) -> str:
        return f"{self._entry.entry_id}_streak_best"

    @property
    def native_value(self):
        return self.state_data.get("streak_best", 0)


class UltimoAllenamentoSensor(MonitorAllenamentiSensorBase):
    _attr_name = "Ultimo Allenamento"
    _attr_icon = "mdi:dumbbell"

    @property
    def unique_id(self) -> str:
        return f"{self._entry.entry_id}_ultimo_allenamento"

    @property
    def native_value(self):
        workouts = self.state_data.get("workouts", [])
        if not workouts:
            return "Nessuno"
        last = workouts[-1]
        wtype = last.get("type", "?")
        dur = last.get("duration_min", 0)
        return f"{wtype} - {dur}min"

    @property
    def extra_state_attributes(self):
        workouts = self.state_data.get("workouts", [])
        if not workouts:
            return {}
        last = workouts[-1]
        return {
            "date": last.get("date", ""),
            "type": last.get("type", ""),
            "duration_min": last.get("duration_min", 0),
            "calories": last.get("calories", 0),
            "distance_km": last.get("distance_km", 0),
            "volume_kg": last.get("volume_kg", 0),
            "sets": last.get("sets", 0),
            "points": last.get("points", 0),
        }


class AllenamentiMeseSensor(MonitorAllenamentiSensorBase):
    _attr_name = "Allenamenti Mese"
    _attr_icon = "mdi:calendar-check"

    @property
    def unique_id(self) -> str:
        return f"{self._entry.entry_id}_allenamenti_mese"

    @property
    def native_value(self):
        workouts = self.state_data.get("workouts", [])
        now = datetime.now()
        month_prefix = now.strftime("%Y-%m")
        count = sum(
            1 for w in workouts
            if w.get("date", "").startswith(month_prefix)
        )
        return count
