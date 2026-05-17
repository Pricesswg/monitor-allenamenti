"""Simple gamification: points, streaks, PR detection."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from .const import WORKOUT_TYPES


def calculate_points(workout_type: str) -> int:
    """Return point value for a workout type."""
    info = WORKOUT_TYPES.get(workout_type)
    if info is None:
        return 0
    return info["points"]


def update_streak(state: dict, workout_date: str) -> None:
    """Update streak in-place based on workout date.

    A streak increments when the workout is on the day after the last workout.
    Same-day workouts don't change the streak. A gap > 1 day resets to 1.
    """
    last = state.get("last_workout_date")

    if last is None:
        state["streak"] = 1
        return

    try:
        last_dt = datetime.fromisoformat(last).date()
        work_dt = datetime.fromisoformat(workout_date).date()
    except (ValueError, TypeError):
        state["streak"] = state.get("streak", 0) + 1
        return

    diff = (work_dt - last_dt).days

    if diff <= 0:
        # Same day or past date: no streak change
        return
    elif diff == 1:
        state["streak"] = state.get("streak", 0) + 1
    else:
        # Gap: reset
        state["streak"] = 1

    state["streak_best"] = max(state.get("streak_best", 0), state["streak"])


def detect_pr(state: dict, workout: dict) -> Optional[dict]:
    """Check if this workout sets any personal records.

    Checks duration, calories, distance, and volume against stored PRs.
    Returns a dict describing the new PR, or None.
    """
    workout_type = workout.get("type", "")
    prs = state.get("personal_records", {})

    # Build metrics to check based on what the workout has
    checks: list[tuple[str, float]] = []

    duration = workout.get("duration_min", 0)
    if duration and duration > 0:
        checks.append(("duration_min", duration))

    calories = workout.get("calories", 0)
    if calories and calories > 0:
        checks.append(("calories", calories))

    distance = workout.get("distance_km", 0)
    if distance and distance > 0:
        checks.append(("distance_km", distance))

    volume = workout.get("volume_kg", 0)
    if volume and volume > 0:
        checks.append(("volume_kg", volume))

    for metric, value in checks:
        pr_key = f"{workout_type}_{metric}"
        existing = prs.get(pr_key, 0)

        if value > existing:
            # New PR
            prs[pr_key] = value
            state["personal_records"] = prs
            return {
                "type": workout_type,
                "metric": metric,
                "previous": existing,
                "new": value,
            }

    return None
