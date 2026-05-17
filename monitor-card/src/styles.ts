import { css } from "lit";

export const monitorTokens = css`
  :host {
    display: block;
    height: 100%;
    box-sizing: border-box;
  }
  :host([panel-mode]) {
    padding-top: var(--monitor-panel-offset, var(--header-height, 56px));
  }
  :host {
    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;

    --bg: var(--ha-card-background, var(--card-background-color, var(--primary-background-color, oklch(0.985 0.004 85))));
    --bg-soft: var(--secondary-background-color, var(--primary-background-color, oklch(0.965 0.005 85)));
    --bg-sunken: var(--primary-background-color, var(--secondary-background-color, oklch(0.945 0.006 85)));
    --surface: var(--ha-card-background, var(--card-background-color, #ffffff));
    --border: var(--divider-color, oklch(0.90 0.006 85));
    --border-soft: var(--divider-color, oklch(0.93 0.005 85));
    --text: var(--primary-text-color, oklch(0.22 0.012 85));
    --text-soft: var(--secondary-text-color, oklch(0.42 0.012 85));
    --text-muted: var(--disabled-text-color, var(--secondary-text-color, oklch(0.60 0.010 85)));

    --accent: var(--accent-color, oklch(0.55 0.15 265));
    --accent-soft: oklch(0.93 0.04 265);
    --accent-ink: oklch(0.35 0.15 265);

    --ok: var(--success-color, oklch(0.65 0.14 155));
    --ok-soft: oklch(0.93 0.04 155);
    --warn: var(--warning-color, oklch(0.72 0.15 65));
    --warn-soft: oklch(0.95 0.04 65);
    --danger: var(--error-color, oklch(0.60 0.18 25));
    --danger-soft: oklch(0.95 0.04 25);
    --info: var(--info-color, oklch(0.60 0.13 230));

    --xp: oklch(0.72 0.15 65);
    --xp-soft: oklch(0.95 0.04 65);
    --xp-ink: oklch(0.48 0.15 65);
    --streak: oklch(0.62 0.20 30);
    --streak-soft: oklch(0.95 0.04 30);

    --r-sm: 6px;
    --r-md: 10px;
    --r-lg: 16px;
    --r-xl: 22px;
    --r-pill: 999px;

    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06);

    --density-pad: 16px;
    --density-gap: 16px;

    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.45;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  :host([density="compact"]) {
    --density-pad: 10px;
    --density-gap: 10px;
  }
`;

export const monitorStyles = css`
  :host { display: block; }
  * { box-sizing: border-box; }
  button, input, select, textarea { font: inherit; color: inherit; }
  button { cursor: pointer; background: none; border: none; padding: 0; }
  .mono { font-family: var(--font-mono); font-feature-settings: "tnum" 1; }

  /* App shell */
  .app {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 600px;
    height: 100%;
    background: var(--bg);
    border-radius: var(--r-lg);
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
    isolation: isolate;
    clip-path: inset(0 round var(--r-lg));
  }

  .sidebar {
    width: 220px;
    background: var(--bg-soft);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 24px 14px 18px;
    gap: 4px;
    min-height: 0;
    overflow-y: auto;
    position: relative;
    z-index: 30;
    transition: width 180ms ease;
  }
  .sidebar[data-mode="mini"] {
    width: 64px;
    padding: 18px 8px 14px;
    align-items: center;
  }
  .sidebar[data-mode="drawer"] {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 220px;
    box-shadow: 0 0 30px rgba(0,0,0,0.18);
  }
  .sidebar-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.32);
    z-index: 25;
    backdrop-filter: blur(2px);
  }
  .sidebar__hamburger {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; margin-bottom: 6px;
    border-radius: var(--r-md);
    color: var(--text-soft);
    transition: background 120ms, color 120ms;
  }
  .sidebar__hamburger:hover { background: var(--bg-sunken); color: var(--text); }
  .sidebar[data-mode="mini"] .sidebar__hamburger { align-self: center; }

  .sidebar__brand {
    display: flex; align-items: center; gap: 10px;
    padding: 6px 8px 18px;
    border-bottom: 1px solid var(--border-soft);
    margin-bottom: 10px;
  }
  .sidebar[data-mode="mini"] .sidebar__brand {
    padding: 6px 0 14px;
    border-bottom: 1px solid var(--border-soft);
    margin-bottom: 8px;
    width: 100%; justify-content: center;
  }
  .sidebar[data-mode="mini"] .nav-item {
    width: 40px; height: 40px;
    padding: 0;
    justify-content: center;
    gap: 0;
  }
  .sidebar__brand-mark {
    width: 30px; height: 30px; border-radius: 9px;
    background: linear-gradient(135deg, var(--accent), var(--xp));
    display: grid; place-items: center; color: white;
    font-weight: 700; font-size: 13px;
    box-shadow: var(--shadow-sm);
  }
  .sidebar__brand-name { font-weight: 600; letter-spacing: -0.01em; font-size: 15px; }
  .sidebar__brand-sub { color: var(--text-muted); font-size: 11px; font-family: var(--font-mono); margin-top: 2px; }

  .nav-section { padding: 14px 8px 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600; }

  .nav-item {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 9px 10px;
    border-radius: var(--r-md);
    color: var(--text-soft); font-size: 13.5px; font-weight: 500;
    text-align: left;
    transition: background 120ms, color 120ms;
  }
  .nav-item:hover { background: var(--bg-sunken); color: var(--text); }
  .nav-item[data-active="true"] {
    background: var(--accent-soft); color: var(--accent-ink); font-weight: 600;
  }
  .nav-item svg { width: 16px; height: 16px; flex: none; }

  .sidebar__footer { margin-top: auto; display: flex; flex-direction: column; gap: 6px; padding-top: 12px; border-top: 1px solid var(--border-soft); }

  /* Content */
  .content { overflow: auto; min-height: 0; position: relative; }
  .content__inner { padding: 28px 36px 60px; max-width: 1400px; margin: 0 auto; }

  .topbar {
    position: sticky; top: 0; z-index: 20;
    display: flex; align-items: center; gap: 14px;
    padding: 14px 36px;
    background: color-mix(in srgb, var(--bg) 86%, transparent);
    backdrop-filter: saturate(1.2) blur(10px);
    border-bottom: 1px solid var(--border-soft);
  }
  .topbar__title { font-size: 18px; font-weight: 600; letter-spacing: -0.015em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .topbar__crumbs { color: var(--text-muted); font-size: 12.5px; font-family: var(--font-mono); }
  .topbar__spacer { flex: 1; }
  .topbar__pill {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 13px; color: var(--text-soft);
    background: var(--bg-sunken); padding: 6px 10px; border-radius: var(--r-md);
    border: 1px solid var(--border-soft);
  }
  .topbar__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 4px color-mix(in srgb, var(--ok) 25%, transparent); }

  .page-title { font-size: 26px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 4px; }
  .page-sub { color: var(--text-muted); font-size: 14px; margin: 0 0 22px; }

  /* Card */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: var(--density-pad);
    box-shadow: var(--shadow-xs);
    min-width: 0;
  }
  .card--ghost { background: var(--bg-soft); }
  .card__header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .card__title { font-weight: 600; font-size: 15px; letter-spacing: -0.01em; margin: 0; }
  .card__sub { color: var(--text-muted); font-size: 12.5px; margin: 2px 0 0; }

  /* KPI */
  .kpi { padding: 16px; border-radius: var(--r-lg); background: var(--surface); border: 1px solid var(--border); }
  .kpi__label { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600; }
  .kpi__value { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; font-family: var(--font-mono); margin-top: 6px; }
  .kpi__delta { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

  /* Button */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 14px; border-radius: var(--r-md);
    border: 1px solid var(--border); background: var(--surface);
    font-size: 13px; font-weight: 500; color: var(--text);
    transition: background 120ms, border-color 120ms, transform 60ms;
  }
  .btn:hover { background: var(--bg-soft); }
  .btn:active { transform: translateY(1px); }
  .btn--primary { background: var(--accent); color: white; border-color: transparent; box-shadow: var(--shadow-sm); }
  .btn--primary:hover { background: color-mix(in srgb, var(--accent) 90%, black); }
  .btn--ghost { border-color: transparent; background: transparent; color: var(--text-soft); }
  .btn--ghost:hover { background: var(--bg-sunken); color: var(--text); }
  .btn--sm { padding: 5px 10px; font-size: 12px; }
  .btn svg { width: 16px; height: 16px; }

  /* Chip */
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px 9px; border-radius: var(--r-pill);
    background: var(--bg-sunken); border: 1px solid var(--border-soft);
    color: var(--text-soft); font-size: 11.5px; font-weight: 500;
  }
  .chip--accent { background: var(--accent-soft); color: var(--accent-ink); border-color: transparent; }
  .chip--ok { background: color-mix(in srgb, var(--ok) 15%, transparent); color: var(--ok); border-color: transparent; }
  .chip--warn { background: var(--warn-soft); color: var(--warn); border-color: transparent; }
  .chip--danger { background: var(--danger-soft); color: var(--danger); border-color: transparent; }
  .chip--xp { background: var(--xp-soft); color: var(--xp-ink); border-color: transparent; }
  .chip__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }

  .tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-family: var(--font-mono); color: var(--text-muted);
    padding: 2px 6px; border-radius: 5px; background: var(--bg-sunken);
  }

  /* Progress bar */
  .progress { height: 6px; border-radius: 3px; background: var(--bg-sunken); overflow: hidden; }
  .progress__fill { height: 100%; border-radius: 3px; transition: width 300ms; }
  .progress--accent .progress__fill { background: var(--accent); }
  .progress--ok .progress__fill { background: var(--ok); }
  .progress--xp .progress__fill { background: var(--xp); }
  .progress--danger .progress__fill { background: var(--danger); }

  /* XP bar — segmented */
  .xp-bar { display: flex; gap: 3px; }
  .xp-bar__seg {
    flex: 1; height: 8px; border-radius: 2px;
    background: var(--bg-sunken); transition: background 200ms;
  }
  .xp-bar__seg--filled { background: var(--accent); }

  /* Ring */
  .ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .ring-label { font-size: 11px; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .ring-value { font-family: var(--font-mono); font-size: 14px; font-weight: 600; }

  /* Stat row */
  .stat-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: var(--r-md);
    transition: background 120ms;
  }
  .stat-row:hover { background: var(--bg-sunken); }
  .stat-row__icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--bg-sunken); display: grid; place-items: center;
    color: var(--text-soft); border: 1px solid var(--border-soft);
    flex-shrink: 0;
  }
  .stat-row__icon svg { width: 17px; height: 17px; }
  .stat-row__main { flex: 1; min-width: 0; }
  .stat-row__name { font-weight: 500; font-size: 13.5px; }
  .stat-row__meta { font-size: 11.5px; color: var(--text-muted); font-family: var(--font-mono); }
  .stat-row__value { font-family: var(--font-mono); font-size: 14px; font-weight: 600; }

  /* Quest card */
  .quest-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 18px;
    display: flex; flex-direction: column; gap: 12px;
    transition: border-color 120ms;
  }
  .quest-card:hover { border-color: color-mix(in srgb, var(--accent) 40%, var(--border)); }
  .quest-card__header { display: flex; align-items: center; gap: 10px; }
  .quest-card__title { font-weight: 600; font-size: 14px; flex: 1; }

  /* Boss */
  .boss-banner {
    background: linear-gradient(135deg, color-mix(in srgb, var(--danger) 12%, var(--surface)), var(--surface));
    border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 20px;
  }
  .boss-banner__title { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
  .boss-banner__sub { color: var(--text-muted); font-size: 12.5px; font-family: var(--font-mono); margin-top: 4px; }

  /* Heatmap */
  .heatmap { display: grid; gap: 4px; }
  .heatmap__cell {
    aspect-ratio: 1; border-radius: 4px;
    background: var(--bg-sunken); border: 1px solid var(--border-soft);
    transition: background 120ms;
  }

  /* Switch */
  .switch { position: relative; display: inline-block; width: 36px; height: 20px; cursor: pointer; }
  .switch input { display: none; }
  .switch__track {
    position: absolute; inset: 0; background: var(--border); border-radius: 999px;
    transition: background 150ms;
  }
  .switch__thumb {
    position: absolute; top: 2px; left: 2px; width: 16px; height: 16px;
    background: white; border-radius: 50%;
    transition: transform 180ms cubic-bezier(.2,.8,.2,1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  .switch input:checked ~ .switch__track { background: var(--accent); }
  .switch input:checked ~ .switch__thumb { transform: translateX(16px); }

  /* Segmented */
  .segmented {
    display: inline-flex; padding: 3px;
    background: var(--bg-sunken); border: 1px solid var(--border-soft);
    border-radius: var(--r-md); gap: 2px;
  }
  .segmented button {
    padding: 6px 12px; border-radius: 7px; color: var(--text-soft);
    font-size: 12.5px; font-weight: 500;
    transition: background 120ms, color 120ms;
  }
  .segmented button[data-active="true"] {
    background: var(--surface); color: var(--text); box-shadow: var(--shadow-xs);
  }

  .divider { height: 1px; background: var(--border-soft); margin: 16px 0; border: 0; }

  /* Grid */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--density-gap); }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--density-gap); }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--density-gap); }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--density-gap); }

  /* Sparkline */
  .sparkline { display: block; }
  .sparkline polyline { fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }

  /* Utility */
  .row { display: flex; align-items: center; gap: 10px; }
  .col { display: flex; flex-direction: column; gap: 10px; }
  .sp-between { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .text-mute { color: var(--text-muted); }
  .text-soft { color: var(--text-soft); }
  .text-sm { font-size: 12.5px; }
  .text-xs { font-size: 11.5px; }
  .fw-600 { font-weight: 600; }
  .fw-700 { font-weight: 700; }
  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Workout set table */
  .set-table { width: 100%; border-collapse: separate; border-spacing: 0; }
  .set-table th {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--text-muted); font-weight: 600; text-align: left;
    padding: 6px 10px; border-bottom: 1px solid var(--border-soft);
  }
  .set-table td {
    padding: 8px 10px; font-family: var(--font-mono); font-size: 13px;
    border-bottom: 1px solid var(--border-soft);
  }
  .set-table tr[data-active="true"] td { color: var(--accent); font-weight: 600; }
  .set-table tr[data-done="true"] td { color: var(--text-muted); }

  /* Tile pick (intensity selector) */
  .tile-pick {
    padding: 14px; border-radius: var(--r-lg); border: 1px solid var(--border);
    background: var(--surface); cursor: pointer;
    display: flex; flex-direction: column; gap: 8px;
    transition: border-color 120ms, background 120ms; text-align: left; width: 100%;
  }
  .tile-pick:hover { border-color: color-mix(in srgb, var(--accent) 30%, var(--border)); }
  .tile-pick[data-selected="true"] { border-color: var(--accent); background: color-mix(in srgb, var(--accent-soft) 60%, var(--surface)); }
  .tile-pick__name { font-weight: 600; font-size: 13.5px; }
  .tile-pick__desc { color: var(--text-muted); font-size: 12px; }

  /* Color dot picker */
  .color-dot {
    width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent;
    cursor: pointer; transition: border-color 120ms, transform 120ms;
    padding: 0; outline: none;
  }
  .color-dot:hover { transform: scale(1.15); }
  .color-dot--active { border-color: var(--text); transform: scale(1.15); box-shadow: 0 0 0 2px var(--surface); }

  /* Settings input */
  .settings-input {
    font-family: var(--font-mono); font-size: 12px; padding: 5px 8px;
    border: 1px solid var(--border); border-radius: var(--r-sm);
    background: var(--bg-sunken); color: var(--text); flex: 1; max-width: 260px;
    outline: none; transition: border-color 120ms;
  }
  .settings-input:focus { border-color: var(--accent); }
  .settings-input::placeholder { color: var(--text-muted); }

  /* Skill bar */
  .skill-bar { display: flex; align-items: center; gap: 12px; }
  .skill-bar__label { font-size: 13px; font-weight: 500; min-width: 90px; }
  .skill-bar__track { flex: 1; height: 8px; border-radius: 4px; background: var(--bg-sunken); overflow: hidden; }
  .skill-bar__fill { height: 100%; border-radius: 4px; background: var(--accent); transition: width 300ms; }
  .skill-bar__value { font-family: var(--font-mono); font-size: 12px; color: var(--text-soft); min-width: 30px; text-align: right; }

  @media (max-width: 900px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .content__inner { padding: 18px 16px 40px; }
    .topbar { padding: 12px 16px; }
    .topbar__crumbs { display: none; }
  }

  @media (max-width: 600px) {
    .content__inner { padding: 14px 10px 30px; }
    .topbar { padding: 10px 12px; gap: 8px; }
    .topbar__title { font-size: 14px; }
    .page-title { font-size: 22px !important; }
    .card { padding: 12px !important; }
    .kpi { padding: 12px; }
    .kpi__value { font-size: 22px; }
    .grid-auto { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr; }
  }
`;
