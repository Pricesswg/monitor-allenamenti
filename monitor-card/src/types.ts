export interface HomeAssistant {
  states: Record<string, HassState>;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<void>;
  connection: { subscribeEvents(cb: (e: any) => void, type: string): Promise<() => void> };
  language: string;
}

export interface HassState {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface MonitorCardConfig {
  type: string;
  title?: string;
  panel_mode?: boolean | "auto";
  panel_offset?: number;
  collapse_sidebar?: boolean;
  mobile_threshold?: number;
  default_screen?: Screen;
}

export type Screen =
  | "overview"
  | "workouts"
  | "body"
  | "calendar"
  | "stats"
  | "settings";

export interface Workout {
  id: string;
  date: string;
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  volume?: number;
  sets?: number;
  points: number;
  source: string;
}
