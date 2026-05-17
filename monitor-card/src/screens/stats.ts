import { LitElement, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { sparklinePath, fmtNum } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";

/* ------------------------------------------------------------------ */
/*  Demo data                                                          */
/* ------------------------------------------------------------------ */

interface PR {
  exercise: string;
  icon: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  sparkData: number[];
}

const DEMO_PRS: PR[] = [
  { exercise: "Stacco", icon: "dumbbell", value: "120 kg", delta: "+5 kg", deltaPositive: true, sparkData: [95, 100, 105, 105, 110, 112, 115, 120] },
  { exercise: "Squat", icon: "dumbbell", value: "95 kg", delta: "+5 kg", deltaPositive: true, sparkData: [70, 75, 80, 82, 85, 88, 90, 95] },
  { exercise: "Panca", icon: "dumbbell", value: "65 kg", delta: "0 kg · 42g", deltaPositive: false, sparkData: [55, 58, 60, 62, 63, 64, 65, 65] },
  { exercise: "5km", icon: "run", value: "24:18", delta: "-0:32", deltaPositive: true, sparkData: [28, 27.5, 27, 26, 25.5, 25, 24.8, 24.3] },
];

interface Distribution {
  label: string;
  pct: number;
  color: string;
}

const DEMO_DISTRIBUTION: Distribution[] = [
  { label: "Pesi", pct: 48, color: "var(--accent)" },
  { label: "Corsa", pct: 28, color: "var(--ok)" },
  { label: "Cammino", pct: 14, color: "var(--warn)" },
  { label: "HIIT", pct: 10, color: "var(--danger)" },
];

/* Scatter plot demo data — inverse correlation weight vs volume */
const SCATTER_DATA = [
  [82, 3200], [81.5, 3400], [81, 3100], [80.5, 3600], [80, 3500],
  [79.5, 3800], [79, 3700], [78.5, 4000], [78, 3900], [77.8, 4200],
  [80.2, 3300], [79.8, 3450], [79.2, 3650], [78.8, 3850], [78.2, 4100],
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

@customElement("monitor-stats")
export class MonitorStats extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true })
  card!: MonitorAllenamentiCard;

  /* ----- render ---------------------------------------------------- */

  render() {
    return html`
      <h1 class="page-title">Statistiche</h1>
      <p class="page-sub">Analisi, record personali, predizioni</p>

      <div class="grid-2" style="margin-bottom:24px">
        ${this._renderCorrelation()}
        ${this._renderPrediction()}
      </div>

      <!-- PR section -->
      <h2 class="card__title" style="margin-bottom:14px">Record personali</h2>
      <div class="card" style="margin-bottom:24px">
        ${DEMO_PRS.map((pr) => this._renderPRRow(pr))}
      </div>

      <!-- Distribution -->
      <h2 class="card__title" style="margin-bottom:14px">Distribuzione 30g</h2>
      <div class="card">
        ${DEMO_DISTRIBUTION.map((d) => this._renderDistBar(d))}
      </div>
    `;
  }

  /* ----- correlation card ----------------------------------------- */

  private _renderCorrelation() {
    const W = 280;
    const H = 200;
    const pad = 30;
    const plotW = W - pad * 2;
    const plotH = H - pad * 2;

    /* scale helpers */
    const xs = SCATTER_DATA.map((d) => d[0]);
    const ys = SCATTER_DATA.map((d) => d[1]);
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);
    const sx = (v: number) => pad + ((v - xMin) / (xMax - xMin)) * plotW;
    const sy = (v: number) => pad + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    /* regression line endpoints (simple linear) */
    const lx1 = sx(xMax);
    const ly1 = sy(yMin);
    const lx2 = sx(xMin);
    const ly2 = sy(yMax);

    return html`
      <div class="card">
        <div class="card__header">
          <div style="flex:1">
            <h3 class="card__title">Correlazione inversa</h3>
            <div class="card__sub">Peso corporeo vs Volume allenamento</div>
          </div>
          <span class="chip chip--ok">FORTE</span>
        </div>

        <div class="sp-between" style="margin-bottom:10px">
          <span class="text-sm text-soft">Coefficiente r</span>
          <span class="mono fw-700" style="font-size:22px;color:var(--ok)">-0.74</span>
        </div>

        <svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;max-height:200px">
          <!-- axes -->
          <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${pad + plotH}" stroke="var(--border)" stroke-width="1"/>
          <line x1="${pad}" y1="${pad + plotH}" x2="${pad + plotW}" y2="${pad + plotH}" stroke="var(--border)" stroke-width="1"/>
          <!-- axis labels -->
          <text x="${pad + plotW / 2}" y="${H - 4}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)">Peso (kg)</text>
          <text x="8" y="${pad + plotH / 2}" text-anchor="middle" fill="var(--text-muted)" font-size="10" font-family="var(--font-mono)" transform="rotate(-90 8 ${pad + plotH / 2})">Volume (kg)</text>
          <!-- dots -->
          ${SCATTER_DATA.map(([x, y]) => svg`
            <circle cx="${sx(x)}" cy="${sy(y)}" r="4" fill="var(--accent)" opacity="0.7"/>
          `)}
          <!-- regression -->
          <line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="var(--danger)" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.6"/>
        </svg>
      </div>
    `;
  }

  /* ----- prediction card ------------------------------------------ */

  private _renderPrediction() {
    return html`
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">Predizione</h3>
        </div>
        <div style="text-align:center;padding:12px 0">
          <div class="text-xs text-mute" style="text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">Target peso</div>
          <div class="mono" style="font-size:36px;font-weight:700;letter-spacing:-0.03em">77.8 <span class="text-sm fw-600" style="font-size:14px">kg</span></div>
          <div class="text-sm text-soft" style="margin-top:6px">Intervallo di confidenza: <span class="mono">76.9 &ndash; 78.7 kg</span> &plusmn;30g</div>
        </div>
        <hr class="divider" />
        <p class="text-sm text-soft" style="line-height:1.6;margin:0">
          Al ritmo attuale, con un deficit medio di 300 kcal/die e 4 sessioni settimanali, il target di 77.8 kg
          viene raggiunto entro circa 6 settimane. Il modello tiene conto della variazione idrica giornaliera.
        </p>
      </div>
    `;
  }

  /* ----- PR row --------------------------------------------------- */

  private _renderPRRow(pr: PR) {
    const path = sparklinePath(pr.sparkData, 60, 20);
    return html`
      <div class="stat-row">
        <div class="stat-row__icon">${icon(pr.icon, 17)}</div>
        <div class="stat-row__main">
          <div class="stat-row__name">${pr.exercise}</div>
        </div>
        <svg class="sparkline" width="60" height="20" viewBox="0 0 60 20" style="margin-right:8px">
          <polyline points="${path}" stroke="${pr.deltaPositive ? "var(--ok)" : "var(--text-muted)"}"/>
        </svg>
        <span class="stat-row__value">${pr.value}</span>
        <span class="chip ${pr.deltaPositive ? "chip--ok" : ""}" style="margin-left:6px">${pr.delta}</span>
      </div>
    `;
  }

  /* ----- distribution bar ----------------------------------------- */

  private _renderDistBar(d: Distribution) {
    return html`
      <div class="skill-bar" style="margin-bottom:8px">
        <span class="skill-bar__label">${d.label}</span>
        <div class="skill-bar__track">
          <div class="skill-bar__fill" style="width:${d.pct}%;background:${d.color}"></div>
        </div>
        <span class="skill-bar__value">${d.pct}%</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "monitor-stats": MonitorStats;
  }
}
