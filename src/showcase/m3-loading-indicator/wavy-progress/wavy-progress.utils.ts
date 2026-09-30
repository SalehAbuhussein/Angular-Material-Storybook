import { TAPER } from './wavy-progress.constants';
import type { Span, WaveShape } from './wavy-progress.types';

export const clampPercent = (value: number): number => Math.max(0, Math.min(100, value));

const clamp01 = (t: number): number => Math.max(0, Math.min(1, t));

export const prefersReducedMotion = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 0 to 1 with a soft start and a soft stop. */
const smoothstep = (t: number): number => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

const easeInOutCubic = (t: number): number => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
};

/** Height of the SVG: the wave above and below the centre, plus half a stroke each side. */
export const barHeight = (amplitude: number, thickness: number): number =>
  Math.ceil(2 * amplitude + thickness + 2);

/**
 * A sine wave along the centre line across `span`. Sampled every pixel and
 * always ending exactly at `span.to`, and the amplitude tapers to zero at both
 * ends so the wave meets the track as a flat line instead of bobbing.
 */
export function wavePath(span: Span, shape: WaveShape): string {
  const { from, to } = span;
  const length = to - from;
  if (length < 1) return '';
  const k = (2 * Math.PI) / shape.wavelength;
  const taper = Math.min(TAPER, length / 2);
  const points: string[] = [];
  for (let i = 0; i <= Math.ceil(length); i++) {
    const x = Math.min(from + i, to);
    const fade = smoothstep(Math.min(x - from, to - x) / taper);
    const y = shape.centerY + Math.sin(x * k - shape.phase) * shape.amplitude * fade;
    points.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return 'M' + points.join('L');
}

/** The flat track on either side of the wave, leaving a gap around it. */
export function trackPath(span: Span, width: number, gap: number, centerY: number, inset: number): string {
  const parts: string[] = [];
  if (span.from > gap + inset) parts.push(`M${inset} ${centerY}L${span.from - gap} ${centerY}`);
  if (span.to + gap < width - inset) parts.push(`M${span.to + gap} ${centerY}L${width - inset} ${centerY}`);
  return parts.join('');
}

/**
 * Where the indeterminate segment is at `progress` (0 to 1) through a sweep.
 * The head eases across first and the tail follows, so both sit at the far end
 * when a sweep finishes and at the start when the next begins: no visible jump.
 */
export function sweepSpan(progress: number, width: number): Span {
  const head = easeInOutCubic(progress / 0.75);
  const tail = easeInOutCubic((progress - 0.25) / 0.75);
  return { from: tail * width, to: head * width };
}

/** Moves `current` toward `target` by a share of the gap that does not depend on frame rate. */
export const approach = (current: number, target: number, seconds: number, rate: number): number =>
  current + (target - current) * (1 - Math.exp(-rate * seconds));
