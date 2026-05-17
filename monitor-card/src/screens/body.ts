import { LitElement, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { entity, fmtNum, fmtDelta, sparklinePath } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";

const RANGES = ["7G", "30G", "3M", "6M", "1A"] as const;

/* Demo weight trend for sparkline */
const DEMO_TREND = [80.2, 79.8, 79.9, 79.5, 79.1, 79.3, 78.9, 78.7, 79.0, 78.6,
  78.8, 78.4, 78.5, 78.2, 78.4, 78.1, 78.3, 78.0, 78.2, 77.9,
  78.1, 77.8, 78.0, 77.7, 77.9, 78.1, 78.0, 77.8, 78.2, 78.4];

@customElement("monitor-body")
export class MonitorBody extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true }) card!: MonitorAllenamentiCard;
  @state() _range: typeof RANGES[number] = "30G";

  render() {
    const hass = this.card.hass;

    /* -- sensor reads with fallbacks ------------------------------------ */
    const peso     = parseFloat(entity(hass, "peso") || hass.states["sensor.weight"]?.state || "78.4");
    const grasso   = parseFloat(hass.states["sensor.fat_ratio"]?.state || "18.2");
    const muscolo  = parseFloat(hass.states["sensor.muscle_mass_kg"]?.state || "35.1");
    const acqua    = parseFloat(hass.states["sensor.body_water"]?.state || "55.8");
    const ossa     = parseFloat(hass.states["sensor.bone_mass_kg"]?.state || "3.4");
    const bmi      = parseFloat(hass.states["sensor.bmi"]?.state || "24.1");

    /* demo-only extras */
    const hrRiposo  = 58;
    const etaVasc   = 32;
    const pesoTarget = 75.0;
    const pesoDelta30 = -2.0;

    /* sparkline */
    const sparkW = 460;
    const sparkH = 140;
    const path = sparklinePath(DEMO_TREND, sparkW, sparkH);

    const kpis: { label: string; value: string; delta: string; iconName: string }[] = [
      { label: "Peso",       value: `${fmtNum(peso, 1)} kg`,     delta: fmtDelta(pesoDelta30, "in 30g"), iconName: "weight" },
      { label: "Grasso",     value: `${fmtNum(grasso, 1)}%`,     delta: fmtDelta(-0.8, "in 30g"),        iconName: "flame" },
      { label: "Muscolo",    value: `${fmtNum(muscolo, 1)} kg`,  delta: fmtDelta(0.3, "in 30g"),         iconName: "dumbbell" },
      { label: "Acqua",      value: `${fmtNum(acqua, 1)}%`,      delta: fmtDelta(0.5, "in 30g"),         iconName: "droplet" },
      { label: "Ossa",       value: `${fmtNum(ossa, 1)} kg`,     delta: "stabile",                       iconName: "shield" },
      { label: "HR Riposo",  value: `${hrRiposo} bpm`,           delta: fmtDelta(-2, "in 30g"),           iconName: "heart" },
      { label: "Età Vasc.",  value: `${etaVasc} anni`,           delta: fmtDelta(-1, "in 6m"),            iconName: "trending-down" },
      { label: "BMI",        value: fmtNum(bmi, 1),              delta: fmtDelta(-0.6, "in 30g"),         iconName: "chart" },
    ];

    return html`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Composizione</h1>
          <p class="page-sub">${fmtNum(peso, 1)} kg · ${fmtDelta(pesoDelta30)} kg in 30 giorni</p>
        </div>

        <!-- Time range segmented -->
        <div class="segmented">
          ${RANGES.map(r => html`
            <button data-active="${this._range === r}"
              @click=${() => { this._range = r; }}>
              ${r}
            </button>
          `)}
        </div>

        <!-- Sparkline chart -->
        <div class="card" style="padding:20px">
          <div class="card__header">
            <h3 class="card__title">Andamento peso</h3>
            <span class="chip chip--accent">${this._range}</span>
          </div>
          <svg class="sparkline" viewBox="0 0 ${sparkW} ${sparkH}" width="100%" height="200"
            preserveAspectRatio="none" style="display:block">
            <defs>
              <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="${path} L${sparkW},${sparkH} L0,${sparkH} Z" fill="url(#wg)"/>
            <polyline points="${path.replace(/[ML]/g, "")}" stroke="var(--accent)"/>
          </svg>
        </div>

        <!-- KPI grid 4x2 -->
        <div class="grid-4" style="grid-template-columns:repeat(4, 1fr)">
          ${kpis.map(k => html`
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${icon(k.iconName, 12)} ${k.label}
              </div>
              <div class="kpi__value" style="font-size:22px">${k.value}</div>
              <div class="kpi__delta">${k.delta}</div>
            </div>
          `)}
        </div>

        <!-- Previsione -->
        <div class="card">
          <div class="card__header">
            <div style="color:var(--accent)">${icon("target", 18)}</div>
            <div>
              <h3 class="card__title">Previsione</h3>
              <div class="card__sub">Basata sul trend ${this._range}</div>
            </div>
          </div>
          <div class="row" style="gap:24px;padding:8px 0">
            <div>
              <div class="text-mute text-xs" style="margin-bottom:4px">Peso previsto (90g)</div>
              <div class="mono fw-700" style="font-size:22px">${fmtNum(pesoTarget + 1.8, 1)} kg</div>
            </div>
            <div>
              <div class="text-mute text-xs" style="margin-bottom:4px">Intervallo</div>
              <div class="mono fw-600" style="font-size:15px;color:var(--text-soft)">${fmtNum(pesoTarget + 0.8, 1)} – ${fmtNum(pesoTarget + 2.8, 1)} kg</div>
            </div>
            <div>
              <div class="text-mute text-xs" style="margin-bottom:4px">Obiettivo</div>
              <div class="mono fw-600" style="font-size:15px;color:var(--ok)">${fmtNum(pesoTarget, 1)} kg</div>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}
