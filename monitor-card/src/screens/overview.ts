import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { fmtNum, fmtDelta, sparklinePath } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";
import type { Workout } from "../types";

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
    default: return "dumbbell";
  }
}

function workoutLabel(type: string): string {
  switch (type) {
    case "pesi": return "Pesi";
    case "corsa": return "Corsa";
    case "cammino": return "Cammino";
    case "hiit": return "HIIT";
    default: return type;
  }
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
}

declare global {
  interface HTMLElementTagNameMap {
    "monitor-overview": MonitorOverview;
  }
}
