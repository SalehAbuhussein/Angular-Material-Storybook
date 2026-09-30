export type RangeKey = 7 | 30 | 90;

export interface Kpi {
  id: string;
  label: string;
  icon: string;
  /** Value for a 30 day window. Other ranges scale from this. */
  base: number;
  prefix?: string;
  suffix?: string;
  /** Change against the previous window, as a fraction. */
  delta: number;
}

/** A KPI with its value worked out for the current range. */
export interface KpiView extends Kpi {
  value: number;
}

export interface ActivityItem {
  icon: string;
  title: string;
  meta: string;
  ago: string;
}

export interface OrderPreview {
  id: string;
  customer: string;
  total: number;
  status: string;
}
