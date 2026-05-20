export interface HomeAssistant {
  states: Record<string, HassState>;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<void>;
  callWS<T = any>(msg: Record<string, any>): Promise<T>;
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
  duration_min: number;
  calories: number;
  distance_km?: number;
  volume_kg?: number;
  sets?: number;
  points: number;
  source: string;
}

export interface WeightRecord {
  date: string;
  weight: number;
  fat_ratio?: number | null;
  muscle_mass?: number | null;
  body_water?: number | null;
}

export interface ActivitySummary {
  date: string;
  active_energy: number;
  active_energy_goal: number;
  exercise_min: number;
  exercise_goal: number;
  stand_hours: number;
  stand_goal: number;
}

export interface SleepNight {
  date: string;
  core_min: number;
  deep_min: number;
  rem_min: number;
  awake_min: number;
  total_min: number;
}

export interface RestingHR {
  date: string;
  bpm: number;
}

export interface VO2MaxRecord {
  date: string;
  value: number;
}

export interface HRVRecord {
  date: string;
  value_ms: number;
}

export interface MonitorState {
  workouts: Workout[];
  weight_history: WeightRecord[];
  points_total: number;
  streak: number;
  streak_best: number;
  personal_records: Record<string, number>;
  last_workout_date: string | null;
  activity_summaries: ActivitySummary[];
  sleep_history: SleepNight[];
  resting_hr: RestingHR[];
  vo2max: VO2MaxRecord[];
  hrv_daily: HRVRecord[];
}
