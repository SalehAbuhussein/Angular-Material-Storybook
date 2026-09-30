import type { Kpi, KpiView, RangeKey } from './dashboard.types';

/** Deterministic pseudo-random series, so the chart is stable between renders. */
export function series(points: number, seed: number): number[] {
  const out: number[] = [];
  let value = 50;
  for (let i = 0; i < points; i++) {
    const noise = Math.sin((i + seed) * 1.7) * 18 + Math.cos((i + seed) * 0.6) * 11;
    value = Math.max(12, Math.min(100, value + noise * 0.35));
    out.push(Math.round(value));
  }
  return out;
}

/** KPI values scale with the window, so switching the range changes the numbers. */
export function scaleKpis(kpis: Kpi[], range: RangeKey): KpiView[] {
  const factor = range / 30;
  return kpis.map((k) => ({
    ...k,
    value: k.suffix === '%' ? k.base : Math.round(k.base * factor),
    delta: k.delta * (range === 7 ? 0.6 : range === 90 ? 1.4 : 1),
  }));
}

export const chartLabelFor = (range: number, points: number): string =>
  `Revenue trend over ${range} days, ${points} data points`;
