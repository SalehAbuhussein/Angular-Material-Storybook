import { POINTS } from './m3-loading-indicator.constants';
import type { Shape } from './m3-loading-indicator.types';

export function radii(shape: Shape): number[] {
  return Array.from({ length: POINTS }, (_, i) => 1 + shape.a * Math.cos(shape.k * ((i / POINTS) * Math.PI * 2)));
}

/** A smooth closed path through the points, using quadratic midpoints. */
export function toPath(r: number[], scale: number, c: number): string {
  const pts = r.map((ri, i) => {
    const t = (i / POINTS) * Math.PI * 2;
    return [c + Math.cos(t) * ri * scale, c + Math.sin(t) * ri * scale];
  });
  const mid = (p: number[], q: number[]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M${mid(pts[POINTS - 1], pts[0]).join(' ')}`;
  for (let i = 0; i < POINTS; i++) {
    const m = mid(pts[i], pts[(i + 1) % POINTS]);
    d += `Q${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)} ${m[0].toFixed(2)} ${m[1].toFixed(2)}`;
  }
  return d + 'Z';
}

/** Overshoots a little and settles, like the M3 expressive spatial springs. */
export const spring = (t: number): number => 1 - Math.cos(t * Math.PI * 1.25) * Math.exp(-5 * t);

/** Blends two radius lists point by point; e runs from 0 (from) to 1 (to). */
export const blend = (from: number[], to: number[], e: number): number[] =>
  from.map((r, i) => r + (to[i] - r) * e);

export const prefersReducedMotion = (): boolean =>
  matchMedia('(prefers-reduced-motion: reduce)').matches;
