import { LitElement, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { fmtNum, fmtDelta, sparklinePath } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";
import type { WeightRecord } from "../types";

const RANGES = ["7G", "30G", "3M", "6M", "1A"] as const;

function rangeDays(r: typeof RANGES[number]): number {
  switch (r) {
    case "7G": return 7;
    case "30G": return 30;
    case "3M": return 90;
    case "6M": return 180;
    case "1A": return 365;
  }
}

function ws(hass: any, id: string): string | null {
  const s = hass.states[id];
  if (!s || s.state === "unknown" || s.state === "unavailable") return null;
  return s.state;
}

@customElement("monitor-body")
export class MonitorBody extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true }) card!: MonitorAllenamentiCard;
  @state() _range: typeof RANGES[number] = "30G";

  render() {
    const hass = this.card.hass;

    const peso     = parseFloat(ws(hass, "sensor.withings_peso") || "0");
    const altezza  = parseFloat(ws(hass, "sensor.withings_altezza") || "0");
    const obiettivo = parseFloat(ws(hass, "sensor.withings_obiettivo_di_peso") || "0");
    const passi    = parseFloat(ws(hass, "sensor.withings_passi_oggi") || "0");
    const calAtt   = parseFloat(ws(hass, "sensor.withings_calorie_attive_bruciate_oggi") || "0");
    const calTot   = parseFloat(ws(hass, "sensor.withings_calorie_totali_bruciate_oggi") || "0");
    const distanza = parseFloat(ws(hass, "sensor.withings_distanza_percorsa_oggi") || "0");
    const attInt   = parseFloat(ws(hass, "sensor.withings_attivita_intensa_oggi") || "0");
    const attMod   = parseFloat(ws(hass, "sensor.withings_attivita_moderata_oggi") || "0");
    const attLeg   = parseFloat(ws(hass, "sensor.withings_attivita_leggera_oggi") || "0");
    const elevaz   = parseFloat(ws(hass, "sensor.withings_variazione_dell_elevazione_oggi") || "0");

    const bmi = altezza > 0 ? peso / (altezza * altezza) : 0;
    const daObiettivo = peso - obiettivo;
    const distKm = distanza / 1000;

    const allHistory: WeightRecord[] = this.card.monitorState?.weight_history ?? [];
    const days = rangeDays(this._range);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    const filtered = allHistory.filter(w => w.date >= cutoffStr);
    const trend = filtered.map(w => w.weight);

    const sparkW = 460;
    const sparkH = 140;
    const path = trend.length >= 2 ? sparklinePath(trend, sparkW, sparkH) : "";

    return html`
      <div class="col" style="gap:22px">

        <div>
          <h1 class="page-title">Composizione</h1>
          <p class="page-sub">${fmtNum(peso, 1)} kg · obiettivo ${fmtNum(obiettivo, 0)} kg (${fmtDelta(daObiettivo, "kg")})</p>
        </div>

        <div class="segmented">
          ${RANGES.map(r => html`
            <button data-active="${this._range === r}"
              @click=${() => { this._range = r; }}>
              ${r}
            </button>
          `)}
        </div>

        <!-- Weight chart -->
        <div class="card" style="padding:20px">
          <div class="card__header">
            <h3 class="card__title">Andamento peso</h3>
            <span class="chip chip--accent">${this._range}</span>
            ${trend.length >= 2 ? html`
              <span class="chip" style="margin-left:auto">
                ${fmtDelta(trend[trend.length - 1] - trend[0], "kg")}
              </span>
            ` : ""}
          </div>
          ${path ? html`
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
          ` : html`
            <div style="height:200px;display:grid;place-items:center;color:var(--text-muted)">
              Nessun dato peso per questo periodo
            </div>
          `}
        </div>

        <!-- Peso & BMI -->
        <div class="grid-4" style="grid-template-columns:repeat(4, 1fr)">
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${icon("weight", 12)} Peso
            </div>
            <div class="kpi__value" style="font-size:22px">${fmtNum(peso, 1)} kg</div>
            <div class="kpi__delta">attuale</div>
          </div>
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${icon("target", 12)} Obiettivo
            </div>
            <div class="kpi__value" style="font-size:22px">${fmtNum(obiettivo, 0)} kg</div>
            <div class="kpi__delta" style="color:${daObiettivo > 0 ? "var(--warn)" : "var(--ok)"}">${fmtDelta(daObiettivo, "kg")}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${icon("chart", 12)} BMI
            </div>
            <div class="kpi__value" style="font-size:22px">${fmtNum(bmi, 1)}</div>
            <div class="kpi__delta">${altezza > 0 ? `${fmtNum(altezza * 100, 0)} cm` : "—"}</div>
          </div>
          <div class="kpi">
            <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
              ${icon("trending-down", 12)} Da obiettivo
            </div>
            <div class="kpi__value" style="font-size:22px;color:${daObiettivo > 0 ? "var(--warn)" : "var(--ok)"}">${fmtNum(Math.abs(daObiettivo), 1)} kg</div>
            <div class="kpi__delta">${daObiettivo > 0 ? "da perdere" : "raggiunto"}</div>
          </div>
        </div>

        <!-- Attività giornaliera -->
        <div>
          <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Attività oggi</h2>
          <div class="grid-4" style="grid-template-columns:repeat(4, 1fr)">
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${icon("run", 12)} Passi
              </div>
              <div class="kpi__value" style="font-size:22px">${fmtNum(passi, 0)}</div>
            </div>
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${icon("flame", 12)} Cal. attive
              </div>
              <div class="kpi__value" style="font-size:22px">${fmtNum(calAtt, 0)}</div>
              <div class="kpi__delta">${fmtNum(calTot, 0)} totali</div>
            </div>
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${icon("heart", 12)} Distanza
              </div>
              <div class="kpi__value" style="font-size:22px">${fmtNum(distKm, 1)} km</div>
              <div class="kpi__delta">${fmtNum(elevaz, 0)} m dislivello</div>
            </div>
            <div class="kpi">
              <div class="kpi__label" style="display:flex;align-items:center;gap:5px">
                ${icon("clock", 12)} Attività
              </div>
              <div class="kpi__value" style="font-size:22px">${fmtNum(attInt + attMod, 0)} min</div>
              <div class="kpi__delta">${fmtNum(attLeg, 0)} min leggera</div>
            </div>
          </div>
        </div>

      </div>
    `;
  }
}
