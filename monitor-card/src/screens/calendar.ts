import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { entity, fmtNum } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";

/* intensity 0-4 mapped to CSS colors */
const INTENSITY_COLORS = [
  "var(--bg-sunken)",
  "color-mix(in srgb, var(--accent) 25%, var(--bg-sunken))",
  "color-mix(in srgb, var(--accent) 50%, var(--bg-sunken))",
  "color-mix(in srgb, var(--accent) 75%, var(--bg-sunken))",
  "var(--accent)",
];

/* Build month grid: array of weeks, each week is 7 cells (Mon=0..Sun=6) */
function buildMonth(year: number, month: number): { day: number; intensity: number }[][] {
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  /* JS getDay: 0=Sun..6=Sat -> shift to Mon=0..Sun=6 */
  const startDow = (first.getDay() + 6) % 7;

  const weeks: { day: number; intensity: number }[][] = [];
  let week: { day: number; intensity: number }[] = [];

  /* pad leading blanks */
  for (let i = 0; i < startDow; i++) week.push({ day: 0, intensity: -1 });

  for (let d = 1; d <= lastDay; d++) {
    /* demo intensities: some pattern */
    const demo = d % 3 === 0 ? 0 : d % 7 === 0 ? 4 : d % 5 === 0 ? 3 : d % 2 === 0 ? 2 : 1;
    week.push({ day: d, intensity: d > new Date().getDate() ? -1 : demo });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  /* pad trailing */
  if (week.length > 0) {
    while (week.length < 7) week.push({ day: 0, intensity: -1 });
    weeks.push(week);
  }
  return weeks;
}

/* Streak ring SVG */
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

  render() {
    const hass = this.card.hass;

    const streak     = parseInt(entity(hass, "streak") || "12", 10);
    const bestStreak = 23;

    /* summary stats (demo) */
    const sessioni = 18;
    const riposi   = 4;
    const volumeKg = 28400;
    const kmTotali = 32.5;

    const now = new Date();
    const monthName = now.toLocaleDateString("it-IT", { month: "long", year: "numeric" });
    const weeks = buildMonth(now.getFullYear(), now.getMonth());
    const dayLabels = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

    return html`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Calendario</h1>
          <p class="page-sub">Streak: ${streak} giorni · Best: ${bestStreak}</p>
        </div>

        <!-- Summary card with streak ring -->
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
                <div class="mono fw-700" style="font-size:20px">${riposi}</div>
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

        <!-- Monthly calendar -->
        <div class="card">
          <div class="card__header">
            <h3 class="card__title" style="text-transform:capitalize">${monthName}</h3>
          </div>
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">
            <!-- Day headers -->
            ${dayLabels.map(d => html`
              <div style="text-align:center;font-size:11px;color:var(--text-muted);font-weight:600;padding-bottom:6px">${d}</div>
            `)}
            <!-- Day cells -->
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
          <!-- Legend -->
          <div class="row" style="margin-top:14px;gap:6px;justify-content:flex-end">
            <span class="text-xs text-mute">Meno</span>
            ${INTENSITY_COLORS.map(c => html`
              <div style="width:14px;height:14px;border-radius:3px;background:${c};border:1px solid var(--border-soft)"></div>
            `)}
            <span class="text-xs text-mute">Più</span>
          </div>
        </div>

        <!-- Prossimo allenamento -->
        <div class="card">
          <div class="card__header">
            <div style="color:var(--accent)">${icon("calendar", 18)}</div>
            <div>
              <h3 class="card__title">Prossimo allenamento</h3>
              <div class="card__sub">Domani · Upper Body</div>
            </div>
          </div>
          <div class="row" style="gap:8px">
            <span class="chip">${icon("dumbbell", 11)} Pesi</span>
            <span class="chip">${icon("clock", 11)} ~60 min</span>
            <span class="chip chip--xp">${icon("bolt", 11)} ~120 XP</span>
          </div>
        </div>

      </div>
    `;
  }
}
