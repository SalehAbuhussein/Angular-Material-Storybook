import type { Shape } from './m3-loading-indicator.types';

/**
 * Each shape is a closed curve in polar form, r(θ) = 1 + a·cos(kθ): k lobes of
 * depth a. Sampling every shape at the same angles means any two can be
 * blended point by point, which is what makes the morph smooth.
 */
export const SHAPES: Shape[] = [
  { k: 10, a: 0.07 }, // soft burst
  { k: 9, a: 0.1 }, // 9-sided cookie
  { k: 5, a: 0.13 }, // pentagon
  { k: 2, a: 0.22 }, // pill
  { k: 8, a: 0.05 }, // sunny
  { k: 4, a: 0.12 }, // 4-sided cookie
  { k: 2, a: 0.12 }, // oval
];

/** How many points every shape is sampled at. */
export const POINTS = 96;

/** How long each shape holds before morphing into the next, in ms. */
export const HOLD_MS = 650;
