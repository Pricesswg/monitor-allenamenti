import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { sparklinePath, fmtNum } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";
import type { Workout, WeightRecord } from "../types";

const TYPE_LABELS: Record<string, string> = {
  pesi: "Pesi", corsa: "Corsa", cammino: "Cammino", hiit: "HIIT",
};
const TYPE_COLORS: Record<string, string> = {
  pesi: "var(--accent)", corsa: "var(--ok)", cammino: "var(--warn)", hiit: "var(--danger)",
};

interface PRDisplay {
  label: string;
  iconName: string;
  value: string;
  key: string;
}

function buildPRs(records: Record<string, number>): PRDisplay[] {
  const result: PRDisplay[] = [];
  for (const [key, val] of Object.entries(records)) {
    const parts = key.split("_");
    const type = parts[0];
    const metric = parts.slice(1).join("_");
    let label = TYPE_LABELS[type] || type;
    let unit = "";
    switch (metric) {
      case "duration_min": label += " durata"; unit = " min"; break;
      case "calories": label += " calorie"; unit = " kcal"; break;
      case "distance_km": label += " distanza"; unit = " km"; break;
      case "volume_kg": label += " volume"; unit = " kg"; break;
      default: label += ` ${metric}`;
    }
    result.push({
      label,
      iconName: type === "corsa" ? "run" : type === "cammino" ? "heart" : type === "hiit" ? "flame" : "dumbbell",
      value: `${fmtNum(val, metric === "distance_km" ? 1 : 0)}${unit}`,
      key,
    });
  }
  return result;
}

@customElement("monitor-stats")
export class MonitorStats extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true })
  card!: MonitorAllenamentiCard;

  render() {
    const ms = this.card.monitorState;
    const workouts: Workout[] = ms?.workouts ?? [];
    const weightHistory: WeightRecord[] = ms?.weight_history ?? [];
    const prs = buildPRs(ms?.personal_records ?? {});

    return html`
      <h1 class="page-title">Statistiche</h1>
      <p class="page-sub">Analisi, record personali, distribuzione</p>

      <div class="grid-2" style="margin-bottom:24px">
        ${this._renderCorrelation(workouts, weightHistory)}
        ${this._renderSummary(workouts)}
      </div>

      <h2 class="card__title" style="margin-bottom:14px">Record personali</h2>
      <div class="card" style="margin-bottom:24px">
        ${prs.length === 0
          ? html`<div style="padding:16px;color:var(--text-muted);text-align:center">Nessun record registrato</div>`
          : prs.map(pr => html`
            <div class="stat-row">
              <div class="stat-row__icon">${icon(pr.iconName, 17)}</div>
              <div class="stat-row__main">
                <div class="stat-row__name">${pr.label}</div>
              </div>
              <span class="stat-row__value">${pr.value}</span>
            </div>
          `)}
      </div>

      <h2 class="card__title" style="margin-bottom:14px">Distribuzione 30g</h2>
      <div class="card">
        ${this._renderDistribution(workouts)}
      </div>
    `;
  }

  private _renderCorrelation(workouts: Workout[], weightHistory: WeightRecord[]) {
    const pesoWorkouts = workouts
      .filter(w => w.volume_kg && w.volume_kg > 0)
      .slice(-20);

    if (pesoWorkouts.length < 3 || weightHistory.length < 3) {
      return html`
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">Correlazione</h3>
          </div>
          <div style="padding:20px;text-align:center;color:var(--text-muted)">
            Servono più dati per calcolare la correlazione peso/volume
          </div>
        </div>
      `;
    }

    const W = 280;
    const H = 200;
    const pad = 30;
    const plotW = W - pad * 2;
    const plotH = H - pad * 2;

    const points: [number, number][] = [];
    for (const w of pesoWorkouts) {
      const dateStr = w.date.slice(0, 10);
      const wh = weightHistory.find(r => r.date === dateStr);
      if (wh) points.push([wh.weight, w.volume_kg!]);
    }

    if (points.length < 3) {
      return html`
        <div class="card">
          <div class="card__header"><h3 class="card__title">Correlazione</h3></div>
          <div style="padding:20px;text-align:center;color:var(--text-muted)">Dati insufficienti</div>
        </div>
      `;
    }

    const xs = points.map(p => p[0]);
    const ys = points.map(p => p[1]);
    const xMin = Math.min(...xs), xMax = Math.max(...xs);
    const yMin = Math.min(...ys), yMax = Math.max(...ys);
    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;
    const sx = (v: number) => pad + ((v - xMin) / xRange) * plotW;
    const sy = (v: number) => pad + plotH - ((v - yMin) / yRange) * plotH;

    const n = points.length;
    const xMean = xs.reduce((a, b) => a + b, 0) / n;
    const yMean = ys.reduce((a, b) => a + b, 0) / n;
    let num = 0, denX = 0, denY = 0;
    for (const [x, y] of points) {
      num += (x - xMean) * (y - yMean);
      denX += (x - xMean) ** 2;
      denY += (y - yMean) ** 2;
    }
    const r = denX > 0 && denY > 0 ? num / Math.sqrt(denX * denY) : 0;
    const strength = Math.abs(r) > 0.6 ? "FORTE" : Math.abs(r) > 0.3 ? "MODERATA" : "DEBOLE";

    const slope = denX > 0 ? num / denX : 0;
    const intercept = yMean - slope * xMean;
    const lx1 = sx(xMin), ly1 = sy(slope * xMin + intercept);
    const lx2 = sx(xMax), ly2 = sy(slope * xMax + intercept);

    return html`
      <div class="card">
        <div class="card__header">
          <div style="flex:1">
            <h3 class="card__title">Correlazione</h3>
            <div class="card__sub">Peso corporeo vs Volume allenamento</div>
          </div>
          <span class="chip chip--ok">${strength}</span>
        </div>
        <div class="sp-between" style="margin-bottom:10px">
          <span class="text-sm text-soft">Coefficiente r</span>
          <span class="mono fw-700" style="font-size:22px;color:${r < 0 ? "var(--ok)" : "var(--warn)"}">${r.toFixed(2)}</span>
        </div>
        <svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;max-height:200px">
          <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${pad + plotH}" stroke="var(--border)" stroke-width="1"/>
          <line x1="${pad}" y1="${pad + plotH}" x2="${pad + plotW}" y2="${pad + plotH}" stroke="var(--border)" stroke-width="1"/>
          <text x="${pad + plotW / 2}" y="${H - 4}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)">Peso (kg)</text>
          <text x="8" y="${pad + plotH / 2}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)" transform="rotate(-90 8 ${pad + plotH / 2})">Volume (kg)</text>
          ${points.map(([x, y]) => svg`
            <circle cx="${sx(x)}" cy="${sy(y)}" r="4" fill="var(--accent)" opacity="0.7"/>
          `)}
          <line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="var(--danger)" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.6"/>
        </svg>
      </div>
    `;
  }

  private _renderSummary(workouts: Workout[]) {
    const totalCal = workouts.reduce((s, w) => s + (w.calories || 0), 0);
    const totalMin = workouts.reduce((s, w) => s + (w.duration_min || 0), 0);
    const avgDur = workouts.length > 0 ? totalMin / workouts.length : 0;
    const avgCal = workouts.length > 0 ? totalCal / workouts.length : 0;

    return html`
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Riepilogo</h3>
        </div>
        <div class="grid-2" style="gap:14px">
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Sessioni totali</div>
            <div class="mono fw-700" style="font-size:20px">${workouts.length}</div>
          </div>
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Calorie bruciate</div>
            <div class="mono fw-700" style="font-size:20px">${fmtNum(totalCal)}</div>
          </div>
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Durata media</div>
            <div class="mono fw-700" style="font-size:20px">${fmtNum(avgDur, 0)} min</div>
          </div>
          <div>
            <div class="text-mute text-xs" style="margin-bottom:2px">Calorie medie</div>
            <div class="mono fw-700" style="font-size:20px">${fmtNum(avgCal, 0)} kcal</div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderDistribution(workouts: Workout[]) {
    const last30 = new Date();
    last30.setDate(last30.getDate() - 30);
    const last30Str = last30.toISOString().slice(0, 10);
    const recent = workouts.filter(w => w.date >= last30Str);
    const total = recent.length || 1;

    const counts: Record<string, number> = {};
    for (const w of recent) {
      counts[w.type] = (counts[w.type] || 0) + 1;
    }

    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
      return html`<div style="padding:16px;color:var(--text-muted);text-align:center">Nessun dato negli ultimi 30 giorni</div>`;
    }

    return entries.map(([type, count]) => {
      const pct = Math.round((count / total) * 100);
      return html`
        <div class="skill-bar" style="margin-bottom:8px">
          <span class="skill-bar__label">${TYPE_LABELS[type] || type}</span>
          <div class="skill-bar__track">
            <div class="skill-bar__fill" style="width:${pct}%;background:${TYPE_COLORS[type] || "var(--accent)"}"></div>
          </div>
          <span class="skill-bar__value">${pct}%</span>
        </div>
      `;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "monitor-stats": MonitorStats;
  }
}
