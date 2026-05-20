import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { fmtNum, fmtDelta, sparklinePath } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";
import type { Workout, ActivitySummary, SleepNight, MonitorState } from "../types";

function italianDate(): string {
  const now = new Date();
  const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  const months = [
    "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
    "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
  ];
  return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function workoutIcon(type: string): string {
  switch (type) {
    case "pesi": return "dumbbell";
    case "corsa": return "run";
    case "cammino": return "heart";
    case "hiit": return "flame";
    case "nuoto": return "droplet";
    default: return "dumbbell";
  }
}

function workoutLabel(type: string): string {
  switch (type) {
    case "pesi": return "Pesi";
    case "corsa": return "Corsa";
    case "cammino": return "Cammino";
    case "hiit": return "HIIT";
    case "nuoto": return "Nuoto";
    default: return type;
  }
}

function ringArc(pct: number, r: number, color: string) {
  // Guard NaN/Infinity from missing goals
  const safe = Number.isFinite(pct) ? pct : 0;
  const clamped = Math.min(1, Math.max(0, safe));
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - clamped);
  return svg`
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--border)" stroke-width="6" opacity="0.3"/>
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="${color}" stroke-width="6"
      stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
      stroke-linecap="round" transform="rotate(-90 50 50)"/>
  `;
}

function formatWorkoutDate(iso: string): string {
  try {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Oggi";
    if (d.toDateString() === yesterday.toDateString()) return "Ieri";
    return d.toLocaleDateString("it-IT", { day: "numeric", month: "short" });
  } catch {
    return iso;
  }
}

@customElement("monitor-overview")
export class MonitorOverview extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true })
  card!: MonitorAllenamentiCard;

  render() {
    const hass = this.card.hass;
    const ms = this.card.monitorState;

    const peso = hass.states["sensor.withings_peso"]?.state ?? "—";
    const punti = ms?.points_total ?? 0;
    const streak = ms?.streak ?? 0;

    const workouts = ms?.workouts ?? [];
    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const allenMese = workouts.filter(w => w.date?.startsWith(monthPrefix)).length;

    const recent = [...workouts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

    const weightHistory = (ms?.weight_history ?? []).map(w => w.weight);
    const weightDelta = weightHistory.length >= 2
      ? weightHistory[weightHistory.length - 1] - weightHistory[Math.max(0, weightHistory.length - 8)]
      : 0;

    const sparkW = 160;
    const sparkH = 36;
    const sparkD = weightHistory.length >= 2 ? sparklinePath(weightHistory.slice(-14), sparkW, sparkH) : "";

    return html`
      <div class="col" style="gap:22px">

        <div>
          <h1 class="page-title">Panoramica</h1>
          <p class="page-sub">${italianDate()}</p>
        </div>

        <div class="grid-4">
          <div class="kpi">
            <div class="kpi__label">Peso</div>
            <div class="kpi__value">${peso}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
            <div class="kpi__delta" style="color:${weightDelta <= 0 ? "var(--ok)" : "var(--warn)"}">${weightHistory.length >= 2 ? fmtDelta(weightDelta, "in 7g") : "—"}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Allenamenti</div>
            <div class="kpi__value">${allenMese}</div>
            <div class="kpi__delta">questo mese</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Punti</div>
            <div class="kpi__value">${fmtNum(punti)}</div>
            <div class="kpi__delta">totali</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Streak</div>
            <div class="kpi__value" style="color:var(--streak)">${streak}<span class="text-mute" style="font-size:14px;margin-left:4px">giorni</span></div>
            <div class="kpi__delta">consecutivi</div>
          </div>
        </div>

        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Ultimi allenamenti</h2>
          <div class="card">
            ${recent.length === 0
              ? html`<div style="padding:16px;color:var(--text-muted);text-align:center">Nessun allenamento registrato</div>`
              : recent.map(w => html`
                <div class="stat-row">
                  <div class="stat-row__icon">${icon(workoutIcon(w.type), 17)}</div>
                  <div class="stat-row__main">
                    <div class="stat-row__name">${workoutLabel(w.type)}</div>
                    <div class="stat-row__meta">${formatWorkoutDate(w.date)}</div>
                  </div>
                  <div style="text-align:right">
                    <div class="stat-row__value">${fmtNum(w.duration_min)} min</div>
                    <div class="stat-row__meta">${fmtNum(w.calories)} kcal${w.distance_km ? ` · ${fmtNum(w.distance_km, 1)} km` : ""}${w.volume_kg ? ` · ${fmtNum(w.volume_kg)} kg` : ""}</div>
                  </div>
                </div>
              `)}
          </div>
        </div>

        ${this._renderHealthCards(ms)}

        ${sparkD ? html`
          <div>
            <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Peso</h2>
            <div class="kpi" style="display:flex;align-items:center;gap:20px;max-width:420px">
              <div style="flex:1">
                <div class="kpi__label">Peso attuale</div>
                <div class="kpi__value">${peso}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
                <div class="kpi__delta" style="color:${weightDelta <= 0 ? "var(--ok)" : "var(--warn)"}">${fmtDelta(weightDelta, "in 7g")}</div>
              </div>
              <svg class="sparkline" width="${sparkW}" height="${sparkH}" viewBox="0 0 ${sparkW} ${sparkH}">
                <polyline points="${sparkD}" stroke="var(--accent)"/>
              </svg>
            </div>
          </div>
        ` : ""}

        <div class="row" style="flex-wrap:wrap;gap:10px">
          <button class="btn btn--primary" @click=${() => this.card.navigate("workouts")}>
            ${icon("dumbbell", 14)} Allenamenti
          </button>
          <button class="btn btn--ghost" @click=${() => this.card.navigate("body")}>
            ${icon("scale", 14)} Composizione
          </button>
        </div>

      </div>
    `;
  }
  private _renderHealthCards(ms: any) {
    const activity: ActivitySummary | undefined = (ms?.activity_summaries ?? []).slice(-1)[0];
    const sleep: SleepNight | undefined = (ms?.sleep_history ?? []).slice(-1)[0];
    const rhr = (ms?.resting_hr ?? []).slice(-1)[0];
    const vo2 = (ms?.vo2max ?? []).slice(-1)[0];
    const hrv = (ms?.hrv_daily ?? []).slice(-1)[0];

    if (!activity && !sleep && !rhr) return "";

    return html`
      <div class="grid-2" style="gap:14px">

        ${activity ? html`
          <div class="card" style="padding:16px">
            <div class="sp-between" style="margin-bottom:12px">
              <span class="fw-600 text-sm">Attività oggi</span>
              <span class="text-mute text-xs">${activity.date}</span>
            </div>
            <div style="display:flex;align-items:center;gap:16px">
              <svg width="80" height="80" viewBox="0 0 100 100">
                ${ringArc(activity.active_energy / (activity.active_energy_goal || 1), 44, "var(--danger)")}
                ${ringArc(activity.exercise_min / (activity.exercise_goal || 1), 35, "var(--ok)")}
                ${ringArc(activity.stand_hours / (activity.stand_goal || 1), 26, "var(--accent)")}
              </svg>
              <div class="col" style="gap:6px;flex:1">
                <div class="sp-between">
                  <span class="text-xs" style="color:var(--danger)">Movimento</span>
                  <span class="mono text-xs fw-600">${fmtNum(activity.active_energy)}/${fmtNum(activity.active_energy_goal)} kcal</span>
                </div>
                <div class="sp-between">
                  <span class="text-xs" style="color:var(--ok)">Esercizio</span>
                  <span class="mono text-xs fw-600">${fmtNum(activity.exercise_min)}/${fmtNum(activity.exercise_goal)} min</span>
                </div>
                <div class="sp-between">
                  <span class="text-xs" style="color:var(--accent)">In piedi</span>
                  <span class="mono text-xs fw-600">${fmtNum(activity.stand_hours)}/${fmtNum(activity.stand_goal)} h</span>
                </div>
              </div>
            </div>
          </div>
        ` : ""}

        ${sleep ? html`
          <div class="card" style="padding:16px">
            <div class="sp-between" style="margin-bottom:12px">
              <span class="fw-600 text-sm">Sonno</span>
              <span class="text-mute text-xs">${sleep.date}</span>
            </div>
            <div class="mono fw-700" style="font-size:22px;margin-bottom:4px">
              ${Math.floor(sleep.total_min / 60)}h ${sleep.total_min % 60}m
            </div>
            ${sleep.awake_min > 0 ? html`
              <div class="text-mute text-xs" style="margin-bottom:8px">
                + ${sleep.awake_min}m svegli (totale ${Math.floor((sleep.total_min + sleep.awake_min) / 60)}h ${(sleep.total_min + sleep.awake_min) % 60}m in letto)
              </div>
            ` : ""}
            <div style="display:flex;gap:4px;height:8px;border-radius:4px;overflow:hidden;margin-bottom:10px">
              ${sleep.deep_min > 0 ? html`<div style="flex:${sleep.deep_min};background:var(--accent)" title="Deep ${sleep.deep_min}m"></div>` : ""}
              ${sleep.core_min > 0 ? html`<div style="flex:${sleep.core_min};background:var(--ok)" title="Core ${sleep.core_min}m"></div>` : ""}
              ${sleep.rem_min > 0 ? html`<div style="flex:${sleep.rem_min};background:var(--warn)" title="REM ${sleep.rem_min}m"></div>` : ""}
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              ${sleep.deep_min > 0 ? html`<span class="text-xs"><span style="color:var(--accent)">●</span> Deep ${sleep.deep_min}m</span>` : ""}
              ${sleep.core_min > 0 ? html`<span class="text-xs"><span style="color:var(--ok)">●</span> Core ${sleep.core_min}m</span>` : ""}
              ${sleep.rem_min > 0 ? html`<span class="text-xs"><span style="color:var(--warn)">●</span> REM ${sleep.rem_min}m</span>` : ""}
            </div>
          </div>
        ` : ""}

      </div>

      ${(rhr || vo2 || hrv) ? html`
        <div class="grid-${[rhr, vo2, hrv].filter(Boolean).length}" style="gap:14px">
          ${rhr ? html`
            <div class="kpi">
              <div class="kpi__label">FC riposo</div>
              <div class="kpi__value" style="color:var(--danger)">${rhr.bpm}<span class="text-mute" style="font-size:14px;margin-left:4px">bpm</span></div>
              <div class="kpi__delta">${rhr.date}</div>
            </div>
          ` : ""}
          ${vo2 ? html`
            <div class="kpi">
              <div class="kpi__label">VO₂ Max</div>
              <div class="kpi__value" style="color:var(--ok)">${fmtNum(vo2.value, 1)}</div>
              <div class="kpi__delta">mL/min·kg</div>
            </div>
          ` : ""}
          ${hrv ? html`
            <div class="kpi">
              <div class="kpi__label">HRV</div>
              <div class="kpi__value" style="color:var(--accent)">${fmtNum(hrv.value_ms, 0)}<span class="text-mute" style="font-size:14px;margin-left:4px">ms</span></div>
              <div class="kpi__delta">${hrv.date}</div>
            </div>
          ` : ""}
        </div>
      ` : ""}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "monitor-overview": MonitorOverview;
  }
}
