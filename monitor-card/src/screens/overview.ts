import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { entity, fmtNum, fmtDelta, sparklinePath } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";

/* -- Date formatting --------------------------------------------------- */
function italianDate(): string {
  const now = new Date();
  const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  const months = [
    "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
    "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
  ];
  return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

/* -- Demo data --------------------------------------------------------- */
interface RecentWorkout {
  date: string;
  type: string;
  duration: number;
  calories: number;
  extra: string;
}

const RECENT_WORKOUTS: RecentWorkout[] = [
  { date: "Oggi", type: "Pesi", duration: 52, calories: 320, extra: "4.200 kg vol" },
  { date: "Ieri", type: "Corsa", duration: 35, calories: 380, extra: "5,2 km" },
  { date: "12 mag", type: "Pesi", duration: 48, calories: 290, extra: "3.800 kg vol" },
  { date: "11 mag", type: "Cammino", duration: 45, calories: 210, extra: "4,1 km" },
  { date: "10 mag", type: "HIIT", duration: 25, calories: 350, extra: "" },
];

const WEIGHT_HISTORY = [80.1, 79.8, 79.6, 79.4, 79.2, 79.0, 78.8, 78.9, 78.7, 78.6, 78.5, 78.4];

function workoutIcon(type: string): string {
  switch (type) {
    case "Pesi": return "dumbbell";
    case "Corsa": return "run";
    case "Cammino": return "heart";
    case "HIIT": return "flame";
    default: return "dumbbell";
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

@customElement("monitor-overview")
export class MonitorOverview extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true })
  card!: MonitorAllenamentiCard;

  render() {
    const hass = this.card.hass;

    /* sensor reads with demo fallbacks */
    const peso = entity(hass, "peso") || (hass.states["sensor.weight"]?.state ?? "78,4");
    const pesoDelta = -0.6;
    const allenMese = entity(hass, "allenamenti_mese") || "14";
    const punti = entity(hass, "punti") || "2.840";
    const streak = entity(hass, "streak") || "12";

    /* sparkline */
    const sparkW = 160;
    const sparkH = 36;
    const sparkD = sparklinePath(WEIGHT_HISTORY, sparkW, sparkH);

    return html`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Panoramica</h1>
          <p class="page-sub">${italianDate()}</p>
        </div>

        <!-- KPI row -->
        <div class="grid-4">
          <div class="kpi">
            <div class="kpi__label">Peso</div>
            <div class="kpi__value">${peso}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
            <div class="kpi__delta" style="color:var(--ok)">${fmtDelta(pesoDelta, "in 7g")}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Allenamenti</div>
            <div class="kpi__value">${allenMese}</div>
            <div class="kpi__delta">questo mese</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Punti</div>
            <div class="kpi__value">${punti}</div>
            <div class="kpi__delta">totali</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Streak</div>
            <div class="kpi__value" style="color:var(--streak)">${streak}<span class="text-mute" style="font-size:14px;margin-left:4px">giorni</span></div>
            <div class="kpi__delta">consecutivi</div>
          </div>
        </div>

        <!-- Ultimi allenamenti -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Ultimi allenamenti</h2>
          <div class="card">
            ${RECENT_WORKOUTS.map(
              (w) => html`
                <div class="stat-row">
                  <div class="stat-row__icon">
                    ${icon(workoutIcon(w.type), 17)}
                  </div>
                  <div class="stat-row__main">
                    <div class="stat-row__name">${w.type}</div>
                    <div class="stat-row__meta">${w.date}</div>
                  </div>
                  <div style="text-align:right">
                    <div class="stat-row__value">${w.duration} min</div>
                    <div class="stat-row__meta">${fmtNum(w.calories)} kcal${w.extra ? ` · ${w.extra}` : ""}</div>
                  </div>
                </div>
              `
            )}
          </div>
        </div>

        <!-- Peso sparkline -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Peso</h2>
          <div class="kpi" style="display:flex;align-items:center;gap:20px;max-width:420px">
            <div style="flex:1">
              <div class="kpi__label">Peso attuale</div>
              <div class="kpi__value">${peso}<span class="text-mute" style="font-size:14px;margin-left:4px">kg</span></div>
              <div class="kpi__delta" style="color:var(--ok)">${fmtDelta(pesoDelta, "in 7g")}</div>
            </div>
            <svg class="sparkline" width="${sparkW}" height="${sparkH}" viewBox="0 0 ${sparkW} ${sparkH}">
              <polyline points="${sparkD}" stroke="var(--accent)"/>
            </svg>
          </div>
        </div>

        <!-- Azioni -->
        <div class="row" style="flex-wrap:wrap;gap:10px">
          <button class="btn btn--primary" @click=${() => this.card.navigate("workouts")}>
            ${icon("dumbbell", 14)} Registra allenamento
          </button>
          <button class="btn btn--ghost" @click=${() => this.card.navigate("body")}>
            ${icon("scale", 14)} Vedi composizione
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
