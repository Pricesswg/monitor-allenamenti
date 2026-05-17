"""Config flow for Monitor Allenamenti."""

from __future__ import annotations

import voluptuous as vol
from homeassistant.config_entries import ConfigFlow

from .const import DOMAIN


class MonitorAllenamentiConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Monitor Allenamenti."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        if user_input is not None:
            await self.async_set_unique_id("monitor_allenamenti_default")
            self._abort_if_unique_id_configured()
            return self.async_create_entry(
                title="Monitor Allenamenti",
                data=user_input,
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Optional("athlete_name", default="Atleta"): str,
                }
            ),
        )
