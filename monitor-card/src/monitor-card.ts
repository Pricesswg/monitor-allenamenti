import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { monitorStyles, monitorTokens } from "./styles";
import { icon } from "./icons";
import type { HomeAssistant, MonitorCardConfig, Screen, MonitorState } from "./types";
import { entity } from "./utils";

import "./screens/overview";
import "./screens/workouts";
import "./screens/body";
import "./screens/calendar";
import "./screens/stats";
import "./screens/settings";
import "./editor";

const CARD_VERSION = "1.5.1";

const TITLE_MAP: Record<Screen, [string, string]> = {
  overview: ["Panoramica", "monitor / panoramica"],
  workouts: ["Allenamenti", "monitor / allenamenti"],
  body: ["Composizione", "monitor / composizione"],
  calendar: ["Calendario", "monitor / calendario"],
  stats: ["Statistiche", "monitor / statistiche"],
  settings: ["Impostazioni", "monitor / impostazioni"],
};

@customElement("monitor-allenamenti-card")
export class MonitorAllenamentiCard extends LitElement {
  static styles = [monitorTokens, monitorStyles];

  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: MonitorCardConfig;

  @state() _screen: Screen = "overview";
  @state() _mobile = false;
  @state() _drawerOpen = false;
  @state() _desktopCollapsed = false;
  @state() monitorState: MonitorState | null = null;

  private _resizeObserver?: ResizeObserver;
  private _screenInitialised = false;
  private _stateFetched = false;
  private _eventUnsub?: () => void;

  setConfig(config: MonitorCardConfig) {
    this.config = config || ({} as MonitorCardConfig);
    if (config?.default_screen && !this._screenInitialised) {
      this._screen = config.default_screen;
      this._screenInitialised = true;
    }
    if (config?.collapse_sidebar !== undefined) {
      this._desktopCollapsed = !!config.collapse_sidebar;
    }
    if (this.isConnected) this._checkPanelMode();
  }

  static getConfigElement() {
    return document.createElement("monitor-allenamenti-card-editor");
  }

  static getStubConfig() {
    return { type: "custom:monitor-allenamenti-card" };
  }

  navigate(screen: Screen) {
    this._screen = screen;
    if (this._mobile) this._drawerOpen = false;
  }

  private _checkPanelMode() {
    if (!this.isConnected) return;
    const cfg = this.config?.panel_mode;
    let isPanel: boolean;
    if (cfg === true) isPanel = true;
    else if (cfg === false) isPanel = false;
    else {
      const rect = this.getBoundingClientRect();
      isPanel = rect.top < 30 && rect.height > 200;
    }
    if (this.hasAttribute("panel-mode") !== isPanel) {
      this.toggleAttribute("panel-mode", isPanel);
    }
    const offset = this.config?.panel_offset;
    if (typeof offset === "number" && offset >= 0) {
      this.style.setProperty("--monitor-panel-offset", `${offset}px`);
    } else {
      this.style.removeProperty("--monitor-panel-offset");
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._checkPanelMode();
    setTimeout(() => this._checkPanelMode(), 50);
    setTimeout(() => this._checkPanelMode(), 250);
    this._resizeObserver = new ResizeObserver((entries) => {
      this._checkPanelMode();
      for (const entry of entries) {
        const t = this.config?.mobile_threshold ?? 700;
        this._mobile = t > 0 && entry.contentRect.width < t;
      }
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._eventUnsub?.();
    this._eventUnsub = undefined;
  }

  firstUpdated() {
    this._checkPanelMode();
    this._fetchState();
  }

  async _fetchState() {
    if (!this.hass?.callWS) return;
    try {
      this.monitorState = await this.hass.callWS<MonitorState>({
        type: "monitor_allenamenti/get_state",
      });
      this._stateFetched = true;
    } catch {
      if (!this._stateFetched) this.monitorState = null;
    }
  }

  updated(changed: Map<string, unknown>) {
    super.updated(changed);
    if (changed.has("hass") && !this._stateFetched) {
      this._fetchState();
    }
    if (changed.has("hass") && this.hass && !this._eventUnsub) {
      this.hass.connection
        .subscribeEvents(() => this._fetchState(), "monitor_allenamenti.workout_logged")
        .then((unsub) => { this._eventUnsub = unsub; });
    }
  }

  render() {
    const [title, crumbs] = TITLE_MAP[this._screen] || TITLE_MAP.overview;
    const drawerOpen = this._mobile && this._drawerOpen;
    let sidebarMode: "full" | "mini" | "drawer";
    if (this._mobile) {
      sidebarMode = drawerOpen ? "drawer" : "mini";
    } else {
      sidebarMode = this._desktopCollapsed ? "mini" : "full";
    }

    const points = entity(this.hass, "punti") || "0";
    const streak = entity(this.hass, "streak") || "0";

    return html`
      <div class="app">
        ${this._renderSidebar(sidebarMode)}
        ${drawerOpen
          ? html`<div class="sidebar-backdrop" @click=${() => { this._drawerOpen = false; }}></div>`
          : nothing}
        <main class="content">
          ${this._renderTopbar(title, crumbs, points, streak)}
          <div class="content__inner">
            ${this._renderScreen()}
          </div>
        </main>
      </div>
    `;
  }

  private _renderSidebar(mode: "full" | "mini" | "drawer") {
    const nav: { key: Screen; label: string; iconName: string }[] = [
      { key: "overview", label: "Panoramica", iconName: "dashboard" },
      { key: "workouts", label: "Allenamenti", iconName: "dumbbell" },
      { key: "body", label: "Composizione", iconName: "scale" },
      { key: "calendar", label: "Calendario", iconName: "calendar" },
      { key: "stats", label: "Statistiche", iconName: "chart" },
    ];

    const isMini = mode === "mini";

    return html`
      <aside class="sidebar" data-mode="${mode}">
        <button class="sidebar__hamburger"
          @click=${() => {
            if (this._mobile) this._drawerOpen = !this._drawerOpen;
            else this._desktopCollapsed = !this._desktopCollapsed;
          }}>
          ${icon(isMini ? "menu" : "close", 18)}
        </button>
        <div class="sidebar__brand">
          <div class="sidebar__brand-mark">${icon("dumbbell", 16)}</div>
          ${!isMini
            ? html`<div>
                <div class="sidebar__brand-name">Monitor</div>
                <div class="sidebar__brand-sub">v${CARD_VERSION}</div>
              </div>`
            : nothing}
        </div>
        ${!isMini ? html`<div class="nav-section">Tracking</div>` : nothing}
        ${nav.map(
          (n) => html`
            <button class="nav-item" data-active="${this._screen === n.key}"
              title="${isMini ? n.label : ""}" @click=${() => this.navigate(n.key)}>
              ${icon(n.iconName, 16)} ${isMini ? nothing : html`<span>${n.label}</span>`}
            </button>
          `
        )}
        <div class="sidebar__footer">
          <button class="nav-item" data-active="${this._screen === "settings"}"
            title="${isMini ? "Impostazioni" : ""}" @click=${() => this.navigate("settings")}>
            ${icon("settings", 16)} ${isMini ? nothing : html`<span>Impostazioni</span>`}
          </button>
        </div>
      </aside>
    `;
  }

  private _renderTopbar(title: string, crumbs: string, points: string, streak: string) {
    return html`
      <div class="topbar">
        <div>
          <div class="topbar__title">${title}</div>
          <div class="topbar__crumbs">${crumbs}</div>
        </div>
        <div class="topbar__spacer"></div>
        <div class="topbar__pill">
          ${icon("trending-up", 13)}
          <span>${points} pt</span>
        </div>
        <div class="topbar__pill">
          <span class="topbar__dot"></span>
          <span>Streak ${streak}g</span>
        </div>
      </div>
    `;
  }

  private _renderScreen() {
    switch (this._screen) {
      case "overview":
        return html`<monitor-overview .card=${this}></monitor-overview>`;
      case "workouts":
        return html`<monitor-workouts .card=${this}></monitor-workouts>`;
      case "body":
        return html`<monitor-body .card=${this}></monitor-body>`;
      case "calendar":
        return html`<monitor-calendar .card=${this}></monitor-calendar>`;
      case "stats":
        return html`<monitor-stats .card=${this}></monitor-stats>`;
      case "settings":
        return html`<monitor-settings .card=${this}></monitor-settings>`;
      default:
        return html`<monitor-overview .card=${this}></monitor-overview>`;
    }
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "monitor-allenamenti-card",
  name: "Monitor Allenamenti",
  description: "Tracker peso e allenamenti con statistiche",
  preview: true,
});
