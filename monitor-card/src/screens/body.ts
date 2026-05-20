import { LitElement, html, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { fmtNum, fmtDelta, sparklinePath } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";
import type { WeightRecord, RestingHR, VO2MaxRecord, HRVRecord } from "../types";

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

        <!-- Salute cardiaca -->
        ${this._renderCardioHealth()}

      </div>
    `;
  }

  private _renderCardioHealth() {
    const ms = this.card.monitorState;
    const rhr: RestingHR[] = ms?.resting_hr ?? [];
    const vo2: VO2MaxRecord[] = ms?.vo2max ?? [];
    const hrv: HRVRecord[] = ms?.hrv_daily ?? [];

    if (rhr.length === 0 && vo2.length === 0 && hrv.length === 0) return "";

    const sparkW = 200;
    const sparkH = 40;

    const rhrVals = rhr.slice(-30).map(r => r.bpm);
    const rhrPath = rhrVals.length >= 2 ? sparklinePath(rhrVals, sparkW, sparkH) : "";
    const rhrLast = rhr.length > 0 ? rhr[rhr.length - 1].bpm : 0;

    const vo2Vals = vo2.map(r => r.value);
    const vo2Path = vo2Vals.length >= 2 ? sparklinePath(vo2Vals, sparkW, sparkH) : "";
    const vo2Last = vo2.length > 0 ? vo2[vo2.length - 1].value : 0;

    const hrvVals = hrv.slice(-30).map(r => r.value_ms);
    const hrvPath = hrvVals.length >= 2 ? sparklinePath(hrvVals, sparkW, sparkH) : "";
    const hrvLast = hrv.length > 0 ? hrv[hrv.length - 1].value_ms : 0;

    return html`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Salute cardiaca</h2>
        <div class="grid-2" style="grid-template-columns:1fr 1fr;gap:14px">

          ${rhrPath ? html`
            <div class="card" style="padding:16px">
              <div class="sp-between" style="margin-bottom:8px">
                <span class="fw-600 text-sm">FC riposo</span>
                <span class="mono fw-700" style="font-size:20px;color:var(--danger)">${rhrLast} <span class="text-mute" style="font-size:12px">bpm</span></span>
              </div>
              <svg class="sparkline" width="100%" height="${sparkH}" viewBox="0 0 ${sparkW} ${sparkH}" preserveAspectRatio="none">
                <polyline points="${rhrPath.replace(/[ML]/g, "")}" stroke="var(--danger)"/>
              </svg>
              <div class="text-mute text-xs" style="margin-top:4px">Ultimi 30 giorni</div>
            </div>
          ` : ""}

          ${vo2Path ? html`
            <div class="card" style="padding:16px">
              <div class="sp-between" style="margin-bottom:8px">
                <span class="fw-600 text-sm">VO₂ Max</span>
                <span class="mono fw-700" style="font-size:20px;color:var(--ok)">${fmtNum(vo2Last, 1)} <span class="text-mute" style="font-size:12px">mL/min·kg</span></span>
              </div>
              <svg class="sparkline" width="100%" height="${sparkH}" viewBox="0 0 ${sparkW} ${sparkH}" preserveAspectRatio="none">
                <polyline points="${vo2Path.replace(/[ML]/g, "")}" stroke="var(--ok)"/>
              </svg>
              <div class="text-mute text-xs" style="margin-top:4px">Trend storico</div>
            </div>
          ` : ""}

          ${hrvPath ? html`
            <div class="card" style="padding:16px">
              <div class="sp-between" style="margin-bottom:8px">
                <span class="fw-600 text-sm">HRV</span>
                <span class="mono fw-700" style="font-size:20px;color:var(--accent)">${fmtNum(hrvLast, 0)} <span class="text-mute" style="font-size:12px">ms</span></span>
              </div>
              <svg class="sparkline" width="100%" height="${sparkH}" viewBox="0 0 ${sparkW} ${sparkH}" preserveAspectRatio="none">
                <polyline points="${hrvPath.replace(/[ML]/g, "")}" stroke="var(--accent)"/>
              </svg>
              <div class="text-mute text-xs" style="margin-top:4px">Ultimi 30 giorni</div>
            </div>
          ` : ""}

        </div>
      </div>
    `;
  }
}
