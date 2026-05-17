import type { HomeAssistant } from "./types";

const DOMAIN = "monitor_allenamenti";

export function entity(hass: HomeAssistant, suffix: string): string {
  const id = `sensor.${DOMAIN}_${suffix}`;
  return hass.states[id]?.state ?? "";
}

export function entityAttr(hass: HomeAssistant, suffix: string, attr: string): any {
  const id = `sensor.${DOMAIN}_${suffix}`;
  return hass.states[id]?.attributes?.[attr];
}

export function callMonitorService(hass: HomeAssistant, service: string, data?: Record<string, any>) {
  return hass.callService(DOMAIN, service, data);
}

export function fmtNum(n: number | string, decimals = 0): string {
  const v = typeof n === "string" ? parseFloat(n) : n;
  if (isNaN(v)) return "—";
  return v.toLocaleString("it-IT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtDelta(v: number, unit = ""): string {
  const sign = v > 0 ? "+" : "";
  return `${sign}${fmtNum(v, 1)}${unit ? " " + unit : ""}`;
}

export function pct(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(1, Math.max(0, current / target));
}

export function sparklinePath(data: number[], w: number, h: number): string {
  if (data.length < 2) return "";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  return data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}
