"""Analytics engine: correlations, predictions, PR detection."""

from __future__ import annotations

import math
from typing import Optional


def pearson_correlation(x: list[float], y: list[float]) -> float:
    """Calculate Pearson correlation coefficient between two series."""
    n = min(len(x), len(y))
    if n < 3:
        return 0.0

    x, y = x[:n], y[:n]
    mean_x = sum(x) / n
    mean_y = sum(y) / n

    cov = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    std_x = math.sqrt(sum((xi - mean_x) ** 2 for xi in x))
    std_y = math.sqrt(sum((yi - mean_y) ** 2 for yi in y))

    if std_x == 0 or std_y == 0:
        return 0.0

    return round(cov / (std_x * std_y), 3)


def correlation_strength(r: float) -> str:
    """Human-readable correlation strength."""
    abs_r = abs(r)
    if abs_r >= 0.7:
        return "FORTE"
    elif abs_r >= 0.4:
        return "MODERATA"
    elif abs_r >= 0.2:
        return "DEBOLE"
    return "ASSENTE"


def linear_regression(x: list[float], y: list[float]) -> tuple[float, float]:
    """Simple linear regression. Returns (slope, intercept)."""
    n = min(len(x), len(y))
    if n < 2:
        return 0.0, y[0] if y else 0.0

    x, y = x[:n], y[:n]
    mean_x = sum(x) / n
    mean_y = sum(y) / n

    ss_xx = sum((xi - mean_x) ** 2 for xi in x)
    ss_xy = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))

    if ss_xx == 0:
        return 0.0, mean_y

    slope = ss_xy / ss_xx
    intercept = mean_y - slope * mean_x
    return round(slope, 6), round(intercept, 3)


def predict_weight(weight_history: list[dict], days_ahead: int = 30) -> Optional[dict]:
    """Predict weight using linear regression on recent data.

    Args:
        weight_history: list of {"date": iso, "weight": float}
        days_ahead: how many days to project

    Returns:
        dict with predicted, confidence_low, confidence_high, r_squared
    """
    if len(weight_history) < 7:
        return None

    recent = weight_history[-30:]
    x = list(range(len(recent)))
    y = [h["weight"] for h in recent]

    slope, intercept = linear_regression(x, y)
    predicted = intercept + slope * (len(recent) + days_ahead)

    # Residuals for confidence interval
    residuals = [y[i] - (intercept + slope * x[i]) for i in range(len(x))]
    std_err = math.sqrt(sum(r ** 2 for r in residuals) / max(len(residuals) - 2, 1))

    # R-squared
    mean_y = sum(y) / len(y)
    ss_tot = sum((yi - mean_y) ** 2 for yi in y)
    ss_res = sum(r ** 2 for r in residuals)
    r_squared = 1 - (ss_res / ss_tot) if ss_tot > 0 else 0

    return {
        "predicted": round(predicted, 1),
        "confidence_low": round(predicted - 1.96 * std_err, 1),
        "confidence_high": round(predicted + 1.96 * std_err, 1),
        "r_squared": round(r_squared, 2),
        "slope_per_day": round(slope, 3),
        "days_ahead": days_ahead,
    }


def weight_volume_correlation(state: dict) -> Optional[dict]:
    """Correlate smoothed daily weight with weekly training volume."""
    weight_history = state.get("weight_history", [])
    workout_history = state.get("workout_history", [])

    if len(weight_history) < 14 or len(workout_history) < 4:
        return None

    # Smooth weight with 7-day moving average
    weights = [h["weight"] for h in weight_history[-30:]]
    smoothed = []
    for i in range(len(weights)):
        start = max(0, i - 6)
        window = weights[start : i + 1]
        smoothed.append(sum(window) / len(window))

    # Weekly volumes (sum volume_kg per week)
    from datetime import datetime, timedelta

    now = datetime.now()
    weekly_volumes = []
    weekly_weights = []

    for week_offset in range(4):
        week_start = now - timedelta(days=(week_offset + 1) * 7)
        week_end = now - timedelta(days=week_offset * 7)

        vol = sum(
            w.get("volume_kg", 0)
            for w in workout_history
            if week_start.isoformat() <= w.get("completed_at", "") < week_end.isoformat()
        )
        weekly_volumes.append(vol / 1000)  # in tonnellate

        weight_idx = max(0, len(smoothed) - (week_offset + 1) * 7)
        if weight_idx < len(smoothed):
            weekly_weights.append(smoothed[weight_idx])

    if len(weekly_volumes) < 3 or len(weekly_weights) < 3:
        return None

    min_len = min(len(weekly_volumes), len(weekly_weights))
    r = pearson_correlation(
        weekly_volumes[:min_len], weekly_weights[:min_len]
    )

    return {
        "r": r,
        "strength": correlation_strength(r),
        "volumes": weekly_volumes[:min_len],
        "weights": weekly_weights[:min_len],
    }


def workout_distribution(state: dict, days: int = 30) -> dict:
    """Calculate workout type distribution over recent period."""
    from datetime import datetime, timedelta

    cutoff = (datetime.now() - timedelta(days=days)).isoformat()
    history = state.get("workout_history", [])
    recent = [w for w in history if w.get("completed_at", "") >= cutoff]

    total = max(len(recent), 1)
    counts = {"pesi": 0, "cardio": 0, "cammino": 0}
    for w in recent:
        wtype = w.get("type", "pesi")
        if wtype in counts:
            counts[wtype] += 1

    rest_days = days - total

    return {
        "pesi": round(counts["pesi"] / days * 100),
        "cardio": round(counts["cardio"] / days * 100),
        "cammino": round(counts["cammino"] / days * 100),
        "riposo": round(rest_days / days * 100),
    }
