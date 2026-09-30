/** Deterministic wave, so the sparkline is stable between renders. */
export function wave(points: number, seed: number): number[] {
  return Array.from({ length: points }, (_, i) =>
    Math.round(50 + Math.sin((i + seed) / 3) * 26 + Math.cos((i + seed) / 7) * 14),
  );
}

export const throughputOf = (series: number[]): number =>
  series.reduce((a, b) => a + b, 0) / series.length / 10;

export const cacheHitRate = (autoscale: boolean, shield: boolean): number =>
  84 + (autoscale ? 6 : 0) + (shield ? 3 : 0);

export const countOn = (flags: boolean[]): number => flags.filter(Boolean).length;

/** Maps the series onto the 300 by 80 sparkline box as "x,y" pairs. */
export const sparkPoints = (series: number[]): string[] => {
  const step = 300 / Math.max(1, series.length - 1);
  return series.map((v, i) => `${(i * step).toFixed(1)},${(80 - (v / 100) * 70).toFixed(1)}`);
};

export const linePathOf = (points: string[]): string => `M${points.join(' L')}`;

export const areaPathOf = (points: string[]): string => `M0,80 L${points.join(' L')} L300,80 Z`;
