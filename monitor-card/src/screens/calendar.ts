import { LitElement, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { fmtNum } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";
import type { Workout } from "../types";

const INTENSITY_COLORS = [
  "var(--bg-sunken)",
  "color-mix(in srgb, var(--accent) 25%, var(--bg-sunken))",
  "color-mix(in srgb, var(--accent) 50%, var(--bg-sunken))",
  "color-mix(in srgb, var(--accent) 75%, var(--bg-sunken))",
  "var(--accent)",
];

function buildMonth(year: number, month: number, workoutsByDay: Map<number, number>): { day: number; intensity: number }[][] {
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startDow = (first.getDay() + 6) % 7;
  const now = new Date();
  const today = now.getDate();
  const thisMonth = now.getMonth() === month && now.getFullYear() === year;
  const futureMonth = year > now.getFullYear() || (year === now.getFullYear() && month > now.getMonth());

  const weeks: { day: number; intensity: number }[][] = [];
  let week: { day: number; intensity: number }[] = [];

  for (let i = 0; i < startDow; i++) week.push({ day: 0, intensity: -1 });

  for (let d = 1; d <= lastDay; d++) {
    if (futureMonth || (thisMonth && d > today)) {
      week.push({ day: d, intensity: -1 });
    } else {
      const count = workoutsByDay.get(d) || 0;
      const intensity = count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count === 3 ? 3 : 4;
      week.push({ day: d, intensity });
    }
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push({ day: 0, intensity: -1 });
    weeks.push(week);
  }
  return weeks;
}

function streakRing(current: number, best: number) {
  const pct = best > 0 ? Math.min(1, current / best) : 0;
  const r = 40;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  return svg`
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--bg-sunken)" stroke-width="8"/>
      <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--streak)" stroke-width="8"
        stroke-dasharray="${dash} ${c}" stroke-linecap="round"
        transform="rotate(-90 50 50)"/>
      <text x="50" y="46" text-anchor="middle" fill="var(--streak)" font-family="var(--font-mono)"
        font-size="22" font-weight="700">${current}</text>
      <text x="50" y="62" text-anchor="middle" fill="var(--text-muted)" font-size="10"
        font-weight="500">giorni</text>
    </svg>`;
}

@customElement("monitor-calendar")
export class MonitorCalendar extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true }) card!: MonitorAllenamentiCard;

  // Currently viewed month (defaults to today on first render)
  @state() private _viewYear: number = new Date().getFullYear();
  @state() private _viewMonth: number = new Date().getMonth();

  private _nav(delta: number) {
    let m = this._viewMonth + delta;
    let y = this._viewYear;
    while (m < 0) { m += 12; y -= 1; }
    while (m > 11) { m -= 12; y += 1; }
    this._viewMonth = m;
    this._viewYear = y;
  }

  private _goToday() {
    const now = new Date();
    this._viewYear = now.getFullYear();
    this._viewMonth = now.getMonth();
  }

  render() {
    const ms = this.card.monitorState;
    const workouts: Workout[] = ms?.workouts ?? [];

    const streak     = ms?.streak ?? 0;
    const bestStreak = ms?.streak_best ?? 0;

    const now = new Date();
    const viewing = new Date(this._viewYear, this._viewMonth, 1);
    const isCurrentMonth = this._viewYear === now.getFullYear() && this._viewMonth === now.getMonth();
    const monthPrefix = `${this._viewYear}-${String(this._viewMonth + 1).padStart(2, "0")}`;

    const monthWorkouts = workouts.filter(w => w.date?.startsWith(monthPrefix));
    const sessioni = monthWorkouts.length;
    const volumeKg = monthWorkouts.reduce((s, w) => s + (w.volume_kg || 0), 0);
    const kmTotali = monthWorkouts.reduce((s, w) => s + (w.distance_km || 0), 0);

    const daysInMonth = new Date(this._viewYear, this._viewMonth + 1, 0).getDate();
    const daysWithWorkout = new Set(monthWorkouts.map(w => {
      try { return new Date(w.date).getDate(); } catch { return 0; }
    }));
    // Riposi = giorni passati senza workout (solo fino a oggi per il mese corrente)
    const dayLimit = isCurrentMonth ? now.getDate() : daysInMonth;
    const riposi = Math.max(0, dayLimit - daysWithWorkout.size);

    const workoutsByDay = new Map<number, number>();
    for (const w of monthWorkouts) {
      try {
        const d = new Date(w.date).getDate();
        workoutsByDay.set(d, (workoutsByDay.get(d) || 0) + 1);
      } catch { /* skip */ }
    }

    const monthName = viewing.toLocaleDateString("it-IT", { month: "long", year: "numeric" });
    const weeks = buildMonth(this._viewYear, this._viewMonth, workoutsByDay);
    const dayLabels = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

    return html`
      <div class="col" style="gap:22px">

        <div>
          <h1 class="page-title">Calendario</h1>
          <p class="page-sub">Streak: ${streak} giorni · Best: ${bestStreak}</p>
        </div>

        <div class="card">
          <div class="row" style="gap:24px;flex-wrap:wrap;align-items:flex-start">
            <div class="ring-wrap" style="flex-shrink:0">
              ${streakRing(streak, bestStreak)}
            </div>
            <div class="grid-2" style="flex:1;min-width:200px;gap:14px">
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Sessioni</div>
                <div class="mono fw-700" style="font-size:20px">${sessioni}</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Riposi</div>
                <div class="mono fw-700" style="font-size:20px">${Math.max(0, riposi)}</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Volume</div>
                <div class="mono fw-700" style="font-size:20px">${fmtNum(volumeKg)} kg</div>
              </div>
              <div>
                <div class="text-mute text-xs" style="margin-bottom:2px">Distanza</div>
                <div class="mono fw-700" style="font-size:20px">${fmtNum(kmTotali, 1)} km</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card__header" style="align-items:center;gap:8px">
            <h3 class="card__title" style="text-transform:capitalize;flex:1">${monthName}</h3>
            <button class="btn btn--ghost btn--icon" title="Mese precedente"
              @click=${() => this._nav(-1)}
              style="padding:6px 10px">${icon("chevron-left", 14)}</button>
            ${!isCurrentMonth ? html`
              <button class="btn btn--ghost" title="Oggi"
                @click=${() => this._goToday()}
                style="padding:6px 12px;font-size:12px">Oggi</button>
            ` : ""}
            <button class="btn btn--ghost btn--icon" title="Mese successivo"
              @click=${() => this._nav(1)}
              style="padding:6px 10px">${icon("chevron-right", 14)}</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">
            ${dayLabels.map(d => html`
              <div style="text-align:center;font-size:11px;color:var(--text-muted);font-weight:600;padding-bottom:6px">${d}</div>
            `)}
            ${weeks.flatMap(w => w.map(cell => {
              if (cell.day === 0) return html`<div></div>`;
              const bg = cell.intensity >= 0 ? INTENSITY_COLORS[cell.intensity] : "var(--bg-soft)";
              const today = cell.day === now.getDate();
              return html`
                <div class="heatmap__cell" style="
                  background:${bg};
                  display:flex;align-items:center;justify-content:center;
                  font-family:var(--font-mono);font-size:11px;font-weight:500;
                  color:${cell.intensity >= 3 ? "white" : "var(--text-soft)"};
                  ${today ? "box-shadow:inset 0 0 0 2px var(--accent);border-color:var(--accent)" : ""}
                ">${cell.day}</div>`;
            }))}
          </div>
          <div class="row" style="margin-top:14px;gap:6px;justify-content:flex-end">
            <span class="text-xs text-mute">Meno</span>
            ${INTENSITY_COLORS.map(c => html`
              <div style="width:14px;height:14px;border-radius:3px;background:${c};border:1px solid var(--border-soft)"></div>
            `)}
            <span class="text-xs text-mute">Più</span>
          </div>
        </div>

      </div>
    `;
  }
}
