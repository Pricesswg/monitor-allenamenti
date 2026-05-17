import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { fmtNum } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";

/* -- Types & demo data ------------------------------------------------- */

interface DemoWorkout {
  date: string;
  dateShort: string;
  type: "Pesi" | "Corsa" | "Cammino" | "HIIT";
  duration: number;
  calories: number;
  metric: string;
  points: number;
}

const DEMO_WORKOUTS: DemoWorkout[] = [
  { date: "2026-05-15", dateShort: "Gio 15 mag", type: "Pesi",    duration: 52, calories: 320, metric: "4.200 kg", points: 40 },
  { date: "2026-05-14", dateShort: "Mer 14 mag", type: "Corsa",   duration: 35, calories: 380, metric: "5,2 km",   points: 30 },
  { date: "2026-05-13", dateShort: "Mar 13 mag", type: "Pesi",    duration: 48, calories: 290, metric: "3.800 kg", points: 40 },
  { date: "2026-05-12", dateShort: "Lun 12 mag", type: "Cammino", duration: 45, calories: 210, metric: "4,1 km",   points: 20 },
  { date: "2026-05-11", dateShort: "Dom 11 mag", type: "HIIT",    duration: 25, calories: 350, metric: "Zona 4",   points: 35 },
  { date: "2026-05-10", dateShort: "Sab 10 mag", type: "Pesi",    duration: 55, calories: 340, metric: "4.500 kg", points: 40 },
  { date: "2026-05-09", dateShort: "Ven 9 mag",  type: "Corsa",   duration: 40, calories: 410, metric: "6,1 km",   points: 30 },
  { date: "2026-05-08", dateShort: "Gio 8 mag",  type: "Pesi",    duration: 50, calories: 310, metric: "4.100 kg", points: 40 },
  { date: "2026-05-06", dateShort: "Mar 6 mag",  type: "Corsa",   duration: 30, calories: 320, metric: "4,8 km",   points: 30 },
  { date: "2026-05-05", dateShort: "Lun 5 mag",  type: "Pesi",    duration: 45, calories: 280, metric: "3.600 kg", points: 40 },
];

type FilterKey = "all" | "Pesi" | "Corsa" | "Cammino" | "HIIT";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",     label: "Tutti" },
  { key: "Pesi",    label: "Pesi" },
  { key: "Corsa",   label: "Corsa" },
  { key: "Cammino", label: "Cammino" },
  { key: "HIIT",    label: "HIIT" },
];

function typeChipClass(type: string): string {
  switch (type) {
    case "Pesi":    return "chip--accent";
    case "Corsa":   return "chip--ok";
    case "Cammino": return "chip--warn";
    case "HIIT":    return "chip--danger";
    default:        return "";
  }
}

function workoutIcon(type: string): string {
  switch (type) {
    case "Pesi":    return "dumbbell";
    case "Corsa":   return "run";
    case "Cammino": return "heart";
    case "HIIT":    return "flame";
    default:        return "dumbbell";
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

@customElement("monitor-workouts")
export class MonitorWorkouts extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true })
  card!: MonitorAllenamentiCard;

  @state() _filter: FilterKey = "all";

  private get _filteredWorkouts(): DemoWorkout[] {
    if (this._filter === "all") return DEMO_WORKOUTS;
    return DEMO_WORKOUTS.filter((w) => w.type === this._filter);
  }

  render() {
    const filtered = this._filteredWorkouts;

    return html`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div class="sp-between" style="flex-wrap:wrap;gap:12px">
          <div>
            <h1 class="page-title">Allenamenti</h1>
            <p class="page-sub">Importati da Apple Health</p>
          </div>
          <button class="btn btn--primary" @click=${() => console.log("[monitor] Registra manualmente")}>
            ${icon("plus", 14)} Registra manualmente
          </button>
        </div>

        <!-- Filter segmented control -->
        <div class="segmented">
          ${FILTERS.map(
            (f) => html`
              <button
                data-active="${this._filter === f.key}"
                @click=${() => { this._filter = f.key; }}
              >${f.label}</button>
            `
          )}
        </div>

        <!-- Stats summary -->
        <div class="grid-3">
          <div class="kpi">
            <div class="kpi__label">Totale sessioni</div>
            <div class="kpi__value">147</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Volume totale</div>
            <div class="kpi__value">184<span class="text-mute" style="font-size:14px;margin-left:4px">t</span></div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Distanza totale</div>
            <div class="kpi__value">412<span class="text-mute" style="font-size:14px;margin-left:4px">km</span></div>
          </div>
        </div>

        <!-- Registro -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Registro</h2>
          <div class="col" style="gap:12px">
            ${filtered.map((w) => this._renderWorkoutCard(w))}
            ${filtered.length === 0
              ? html`<div class="card card--ghost" style="text-align:center;padding:28px;color:var(--text-muted)">
                  Nessun allenamento con questo filtro
                </div>`
              : ""}
          </div>
        </div>

      </div>
    `;
  }

  private _renderWorkoutCard(w: DemoWorkout) {
    return html`
      <div class="card">
        <!-- Header row -->
        <div class="sp-between" style="margin-bottom:10px">
          <div class="row">
            ${icon(workoutIcon(w.type), 16)}
            <span class="chip ${typeChipClass(w.type)}">${w.type}</span>
            <span class="text-sm fw-600">${w.dateShort}</span>
          </div>
          <div class="row">
            <span class="tag">Apple Health</span>
            <span class="chip chip--accent">+${w.points} pt</span>
          </div>
        </div>
        <!-- Stats row -->
        <div class="row" style="gap:16px">
          <span class="mono text-sm">${icon("clock", 13)} ${w.duration} min</span>
          <span class="mono text-sm">${icon("flame", 13)} ${fmtNum(w.calories)} kcal</span>
          <span class="mono text-sm">${w.metric}</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "monitor-workouts": MonitorWorkouts;
  }
}
