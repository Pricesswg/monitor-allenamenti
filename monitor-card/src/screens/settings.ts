import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles } from "../styles";
import { icon } from "../icons";
import { callMonitorService } from "../utils";
import type { MonitorAllenamentiCard } from "../monitor-card";

/* -- Workout color config ------------------------------------------------ */

interface WorkoutTypeConfig {
  key: string;
  label: string;
  points: number;
  iconName: string;
  colors: { name: string; chip: string; hex: string }[];
  defaultColor: string;
}

const COLOR_OPTIONS = [
  { name: "Blu",     chip: "chip--accent", hex: "#4a6cf7" },
  { name: "Verde",   chip: "chip--ok",     hex: "#2dbc6e" },
  { name: "Arancio", chip: "chip--warn",   hex: "#d4930d" },
  { name: "Rosso",   chip: "chip--danger", hex: "#d94040" },
  { name: "Viola",   chip: "chip--xp",     hex: "#9060e8" },
];

const WORKOUT_TYPES: WorkoutTypeConfig[] = [
  { key: "pesi",    label: "Pesi",    points: 40, iconName: "dumbbell", colors: COLOR_OPTIONS, defaultColor: "chip--accent" },
  { key: "corsa",   label: "Corsa",   points: 30, iconName: "run",      colors: COLOR_OPTIONS, defaultColor: "chip--ok" },
  { key: "cammino", label: "Cammino", points: 20, iconName: "heart",    colors: COLOR_OPTIONS, defaultColor: "chip--warn" },
  { key: "hiit",    label: "HIIT",    points: 35, iconName: "flame",    colors: COLOR_OPTIONS, defaultColor: "chip--danger" },
];

/* -- Withings sensors ---------------------------------------------------- */

const WITHINGS_SENSORS = [
  { key: "peso",              label: "Peso",              entity: "sensor.withings_peso" },
  { key: "altezza",           label: "Altezza",           entity: "sensor.withings_altezza" },
  { key: "obiettivo_peso",    label: "Obiettivo peso",    entity: "sensor.withings_obiettivo_di_peso" },
  { key: "passi",             label: "Passi oggi",        entity: "sensor.withings_passi_oggi" },
  { key: "calorie_attive",    label: "Calorie attive",    entity: "sensor.withings_calorie_attive_bruciate_oggi" },
  { key: "calorie_totali",    label: "Calorie totali",    entity: "sensor.withings_calorie_totali_bruciate_oggi" },
  { key: "distanza",          label: "Distanza oggi",     entity: "sensor.withings_distanza_percorsa_oggi" },
  { key: "attivita_intensa",  label: "Attività intensa",  entity: "sensor.withings_attivita_intensa_oggi" },
  { key: "attivita_moderata", label: "Attività moderata", entity: "sensor.withings_attivita_moderata_oggi" },
  { key: "attivita_leggera",  label: "Attività leggera",  entity: "sensor.withings_attivita_leggera_oggi" },
  { key: "tempo_attivita",    label: "Tempo attività",    entity: "sensor.withings_tempo_di_attivita_oggi" },
  { key: "elevazione",        label: "Elevazione oggi",   entity: "sensor.withings_variazione_dell_elevazione_oggi" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

@customElement("monitor-settings")
export class MonitorSettings extends LitElement {
  static styles = monitorStyles;

  @property({ attribute: false, hasChanged: () => true })
  card!: MonitorAllenamentiCard;

  @state() private _importPath = "/config/esporta.zip";
  @state() private _importStatus: "idle" | "loading" | "done" | "error" = "idle";
  @state() private _importMessage = "";

  private get hass() {
    return this.card.hass;
  }

  render() {
    return html`
      <div class="col" style="gap:22px">

        <!-- Header -->
        <div>
          <h1 class="page-title">Impostazioni</h1>
          <p class="page-sub">Configurazione</p>
        </div>

        <!-- Workout types & colors -->
        ${this._renderWorkoutTypes()}

        <!-- Withings -->
        ${this._renderWithings()}

        <!-- Import -->
        ${this._renderImport()}

      </div>
    `;
  }

  /* ----- workout types & colors -------------------------------------- */

  private _renderWorkoutTypes() {
    return html`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Tipi di allenamento</h2>
        <div class="card">
          <p class="text-soft text-sm" style="margin:0 0 14px">
            Ogni allenamento importato assegna punti in base al tipo di attività. Scegli il colore per ogni tipo.
          </p>
          <div class="col" style="gap:10px">
            ${WORKOUT_TYPES.map(
              (wt) => html`
                <div class="card card--ghost" style="padding:12px 14px">
                  <div class="sp-between" style="margin-bottom:8px">
                    <div style="display:flex;align-items:center;gap:8px">
                      <div class="stat-row__icon" style="width:28px;height:28px">
                        ${icon(wt.iconName, 14)}
                      </div>
                      <span class="fw-600">${wt.label}</span>
                    </div>
                    <span class="mono fw-600">${wt.points} pt</span>
                  </div>
                  <div style="display:flex;gap:6px;flex-wrap:wrap">
                    ${wt.colors.map(
                      (c) => html`
                        <button class="color-dot${c.chip === wt.defaultColor ? " color-dot--active" : ""}"
                          style="background:${c.hex}"
                          title="${c.name}">
                        </button>
                      `
                    )}
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }

  /* ----- scale integration ------------------------------------------- */

  private _renderWithings() {
    return html`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Withings</h2>
        <div class="card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div class="stat-row__icon" style="background:var(--accent-soft);color:var(--accent-ink)">
              ${icon("scale", 17)}
            </div>
            <div>
              <div class="fw-600">Sensori collegati</div>
              <p class="text-soft text-sm" style="margin:2px 0 0">
                Entità importate dall'integrazione Withings.
              </p>
            </div>
          </div>
          <div class="col" style="gap:4px">
            ${WITHINGS_SENSORS.map(
              (s) => {
                const st = this.hass?.states?.[s.entity];
                const val = st?.state;
                const unit = st?.attributes?.unit_of_measurement || "";
                const available = val && val !== "unknown" && val !== "unavailable";
                return html`
                  <div class="sp-between" style="align-items:center;padding:6px 0;border-bottom:1px solid var(--border)">
                    <span class="text-sm fw-500" style="min-width:130px">${s.label}</span>
                    <div style="display:flex;align-items:center;gap:6px">
                      <span class="mono text-sm">${available ? `${parseFloat(val!).toLocaleString("it-IT")} ${unit}` : "—"}</span>
                      <span class="chip__dot" style="width:6px;height:6px;border-radius:50%;background:${available ? "var(--ok)" : "var(--text-muted)"}"></span>
                    </div>
                  </div>
                `;
              }
            )}
          </div>
        </div>
      </div>
    `;
  }

  /* ----- import card ------------------------------------------------- */

  private _renderImport() {
    const isLoading = this._importStatus === "loading";
    return html`
      <div>
        <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">Importazione Apple Health</h2>
        <div class="card">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <div class="stat-row__icon" style="background:var(--accent-soft);color:var(--accent-ink)">
              ${icon("heart", 17)}
            </div>
            <div>
              <div class="fw-600">Importa da file</div>
              <p class="text-soft text-sm" style="margin:2px 0 0">
                Esporta i dati da Apple Health (.xml o .zip) e caricali in <code style="font-family:var(--font-mono);font-size:11px;background:var(--muted);padding:2px 5px;border-radius:4px">/config/</code> di HA
              </p>
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <input class="settings-input" type="text" style="max-width:none;flex:1"
              .value=${this._importPath}
              @input=${(e: Event) => { this._importPath = (e.target as HTMLInputElement).value; }}
              placeholder="/config/esporta.zip"
            />
            <button class="btn btn--primary" style="white-space:nowrap;min-width:90px"
              ?disabled=${isLoading}
              @click=${this._handleImport}>
              ${isLoading ? "Importo..." : "Importa"}
            </button>
          </div>
          ${this._importMessage ? html`
            <div style="margin-top:10px;padding:8px 12px;border-radius:var(--r-sm);font-size:13px;
              background:${this._importStatus === "error" ? "var(--danger-soft)" : "var(--ok-soft)"};
              color:${this._importStatus === "error" ? "var(--danger)" : "var(--ok)"}">
              ${this._importMessage}
            </div>
          ` : nothing}
          <p class="text-soft text-sm" style="margin:14px 0 0;line-height:1.6">
            Puoi anche importare singoli allenamenti tramite il servizio
            <code style="font-family:var(--font-mono);font-size:11px;background:var(--muted);padding:2px 5px;border-radius:4px">monitor_allenamenti.log_workout</code>
            da Shortcut iOS o automazione HA.
          </p>
        </div>
      </div>
    `;
  }

  private async _handleImport() {
    if (!this._importPath.trim()) return;
    this._importStatus = "loading";
    this._importMessage = "";
    try {
      await callMonitorService(this.hass, "import_apple_health", {
        file_path: this._importPath.trim(),
      });
      this._importStatus = "done";
      this._importMessage = "Importazione completata. Controlla gli allenamenti.";
    } catch (err: any) {
      this._importStatus = "error";
      this._importMessage = err?.message || "Errore durante l'importazione.";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "monitor-settings": MonitorSettings;
  }
}
