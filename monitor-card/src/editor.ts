import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant, MonitorCardConfig, Screen } from "./types";

const SCREEN_OPTIONS: { value: Screen; label: string }[] = [
  { value: "overview", label: "Panoramica" },
  { value: "workouts", label: "Allenamenti" },
  { value: "body", label: "Composizione" },
  { value: "calendar", label: "Calendario" },
  { value: "stats", label: "Statistiche" },
  { value: "settings", label: "Impostazioni" },
];

@customElement("monitor-allenamenti-card-editor")
export class MonitorAllenamentiCardEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    .field__label {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    select, input {
      width: 100%;
      padding: 9px 12px;
      border-radius: 10px;
      border: 1px solid var(--divider-color);
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
      font: inherit;
      font-size: 13px;
      outline: none;
      transition: border-color 120ms;
    }
    select:focus, input:focus {
      border-color: var(--accent-color, #4a6cf7);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
      cursor: pointer;
    }
    .switch input { display: none; }
    .switch__track {
      position: absolute; inset: 0;
      background: var(--divider-color);
      border-radius: 999px;
      transition: background 150ms;
    }
    .switch__thumb {
      position: absolute; top: 2px; left: 2px;
      width: 16px; height: 16px;
      background: white; border-radius: 50%;
      transition: transform 180ms cubic-bezier(.2,.8,.2,1);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .switch input:checked ~ .switch__track {
      background: var(--accent-color, #4a6cf7);
    }
    .switch input:checked ~ .switch__thumb {
      transform: translateX(16px);
    }
    .hint {
      font-size: 11.5px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
  `;

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) _config!: MonitorCardConfig;

  setConfig(config: MonitorCardConfig) {
    this._config = config;
  }

  private _fire(config: MonitorCardConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  render() {
    if (!this._config) return html``;

    return html`
      <div class="field">
        <label class="field__label">Schermata iniziale</label>
        <select
          .value=${this._config.default_screen || "overview"}
          @change=${(e: Event) => {
            this._fire({ ...this._config, default_screen: (e.target as HTMLSelectElement).value as Screen });
          }}>
          ${SCREEN_OPTIONS.map(o => html`<option value=${o.value}>${o.label}</option>`)}
        </select>
      </div>

      <div class="field">
        <div class="row">
          <label class="switch">
            <input type="checkbox"
              .checked=${!!this._config.collapse_sidebar}
              @change=${(e: Event) => {
                this._fire({ ...this._config, collapse_sidebar: (e.target as HTMLInputElement).checked });
              }} />
            <span class="switch__track"></span>
            <span class="switch__thumb"></span>
          </label>
          <span>Sidebar compressa</span>
        </div>
        <div class="hint">Mostra solo le icone nella barra laterale</div>
      </div>

      <div class="field">
        <label class="field__label">Soglia mobile (px)</label>
        <input type="number"
          .value=${String(this._config.mobile_threshold ?? 700)}
          @change=${(e: Event) => {
            this._fire({ ...this._config, mobile_threshold: parseInt((e.target as HTMLInputElement).value, 10) || 700 });
          }} />
        <div class="hint">Sotto questa larghezza la sidebar diventa un drawer</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "monitor-allenamenti-card-editor": MonitorAllenamentiCardEditor;
  }
}
