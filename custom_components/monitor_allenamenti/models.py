"""Data models for Monitor Allenamenti."""

from __future__ import annotations


def default_state() -> dict:
    """Return a fresh default state for a new athlete."""
    return {
        "workouts": [],
        "weight_history": [],
        "points_total": 0,
        "streak": 0,
        "streak_best": 0,
        "personal_records": {},
        "last_workout_date": None,
        # Apple Health imported data
        "activity_summaries": [],
        "sleep_history": [],
        "resting_hr": [],
        "vo2max": [],
        "hrv_daily": [],
    }
