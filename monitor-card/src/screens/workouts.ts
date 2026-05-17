import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { fmtNum } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";
import type { Workout } from "../types";

type FilterKey = "all" | "pesi" | "corsa" | "cammino" | "hiit";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",     label: "Tutti" },
  { key: "pesi",    label: "Pesi" },
  { key: "corsa",   label: "Corsa" },
  { key: "cammino", label: "Cammino" },
  { key: "hiit",    label: "HIIT" },
];

function typeChipClass(type: string): string {
  switch (type) {
    case "pesi":    return "chip--accent";
    case "corsa":   return "chip--ok";
    case "cammino": return "chip--warn";
    case "hiit":    return "chip--danger";
    default:        return "";
  }
}

function workoutIcon(type: string): string {
  switch (type) {
    case "pesi":    return "dumbbell";
    case "corsa":   return "run";
    case "cammino": return "heart";
    case "hiit":    return "flame";
    default:        return "dumbbell";
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

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const days = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
    const months = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  } catch {
    return iso;
  }
}

@customElement("monitor-workouts")
export class MonitorWorkouts extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true })
  card!: MonitorAllenamentiCard;

  @state() _filter: FilterKey = "all";

  private get _workouts(): Workout[] {
    const all = this.card.monitorState?.workouts ?? [];
    const sorted = [...all].sort((a, b) => b.date.localeCompare(a.date));
    if (this._filter === "all") return sorted;
    return sorted.filter(w => w.type === this._filter);
  }

  render() {
    const filtered = this._workouts;
    const all = this.card.monitorState?.workouts ?? [];

    const totalSessions = all.length;
    const totalVolume = all.reduce((s, w) => s + (w.volume_kg || 0), 0);
    const totalDistance = all.reduce((s, w) => s + (w.distance_km || 0), 0);

    return html`
      <div class="col" style="gap:22px">

        <div class="sp-between" style="flex-wrap:wrap;gap:12px">
          <div>
            <h1 class="page-title">Allenamenti</h1>
            <p class="page-sub">${totalSessions} sessioni registrate</p>
          </div>
        </div>

        <div class="segmented">
          ${FILTERS.map(f => html`
            <button data-active="${this._filter === f.key}"
              @click=${() => { this._filter = f.key; }}>
              ${f.label}
            </button>
          `)}
        </div>

        <div class="grid-3">
          <div class="kpi">
            <div class="kpi__label">Sessioni</div>
            <div class="kpi__value">${totalSessions}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Volume totale</div>
            <div class="kpi__value">${totalVolume >= 1000 ? fmtNum(totalVolume / 1000, 1) : fmtNum(totalVolume)}<span class="text-mute" style="font-size:14px;margin-left:4px">${totalVolume >= 1000 ? "t" : "kg"}</span></div>
          </div>
          <div class="kpi">
            <div class="kpi__label">Distanza totale</div>
            <div class="kpi__value">${fmtNum(totalDistance, 1)}<span class="text-mute" style="font-size:14px;margin-left:4px">km</span></div>
          </div>
        </div>

        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Registro</h2>
          <div class="col" style="gap:12px">
            ${filtered.length === 0
              ? html`<div class="card card--ghost" style="text-align:center;padding:28px;color:var(--text-muted)">
                  Nessun allenamento${this._filter !== "all" ? " con questo filtro" : " registrato"}
                </div>`
              : filtered.slice(0, 30).map(w => this._renderWorkoutCard(w))}
          </div>
        </div>

      </div>
    `;
  }

  private _renderWorkoutCard(w: Workout) {
    return html`
      <div class="card">
        <div class="sp-between" style="margin-bottom:10px">
          <div class="row">
            ${icon(workoutIcon(w.type), 16)}
            <span class="chip ${typeChipClass(w.type)}">${workoutLabel(w.type)}</span>
            <span class="text-sm fw-600">${formatDate(w.date)}</span>
          </div>
          <div class="row">
            <span class="tag">${w.source || "manuale"}</span>
            <span class="chip chip--accent">+${w.points} pt</span>
          </div>
        </div>
        <div class="row" style="gap:16px">
          <span class="mono text-sm">${icon("clock", 13)} ${fmtNum(w.duration_min)} min</span>
          <span class="mono text-sm">${icon("flame", 13)} ${fmtNum(w.calories)} kcal</span>
          ${w.distance_km ? html`<span class="mono text-sm">${fmtNum(w.distance_km, 1)} km</span>` : ""}
          ${w.volume_kg ? html`<span class="mono text-sm">${fmtNum(w.volume_kg)} kg vol</span>` : ""}
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
