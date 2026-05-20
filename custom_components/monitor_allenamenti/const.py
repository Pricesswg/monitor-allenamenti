"""Constants for Monitor Allenamenti."""

DOMAIN = "monitor_allenamenti"
VERSION = "1.5.1"
STORAGE_KEY = "monitor_allenamenti_state"
STORAGE_VERSION = 1

# Workout types with point values
WORKOUT_TYPES = {
    "pesi": {"name": "Pesi", "points": 40},
    "corsa": {"name": "Corsa", "points": 30},
    "cammino": {"name": "Cammino", "points": 20},
    "hiit": {"name": "HIIT", "points": 35},
    "nuoto": {"name": "Nuoto", "points": 35},
}

# Withings sensor entity IDs
WITHINGS_PESO = "sensor.withings_peso"
WITHINGS_ALTEZZA = "sensor.withings_altezza"
WITHINGS_OBIETTIVO_PESO = "sensor.withings_obiettivo_di_peso"
WITHINGS_PASSI_OGGI = "sensor.withings_passi_oggi"
WITHINGS_CALORIE_ATTIVE = "sensor.withings_calorie_attive_bruciate_oggi"
WITHINGS_CALORIE_TOTALI = "sensor.withings_calorie_totali_bruciate_oggi"
WITHINGS_DISTANZA_OGGI = "sensor.withings_distanza_percorsa_oggi"
WITHINGS_ATTIVITA_INTENSA = "sensor.withings_attivita_intensa_oggi"
WITHINGS_ATTIVITA_LEGGERA = "sensor.withings_attivita_leggera_oggi"
WITHINGS_ATTIVITA_MODERATA = "sensor.withings_attivita_moderata_oggi"
WITHINGS_TEMPO_ATTIVITA = "sensor.withings_tempo_di_attivita_oggi"
WITHINGS_ELEVAZIONE = "sensor.withings_variazione_dell_elevazione_oggi"

# Events
EVENT_WORKOUT_LOGGED = f"{DOMAIN}.workout_logged"
EVENT_PR_ACHIEVED = f"{DOMAIN}.pr_achieved"

# Services
SERVICE_LOG_WORKOUT = "log_workout"
SERVICE_IMPORT_APPLE_HEALTH = "import_apple_health"
