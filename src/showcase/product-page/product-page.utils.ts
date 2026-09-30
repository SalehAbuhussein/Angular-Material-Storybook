import type { BasketItem, ColorOption, SlideSize } from './product-page.types';

export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

const SIZES_BY_OFFSET: SlideSize[] = ['large', 'medium', 'small'];

/** The first photo in view is large, the next medium, the next small; the rest are hidden. */
export const slideSize = (index: number, start: number): SlideSize =>
  SIZES_BY_OFFSET[index - start] ?? 'hidden';

/** -1, 0 or 1 for a horizontal drag of `dx` pixels. */
export const swipeStep = (dx: number, threshold: number): number =>
  Math.abs(dx) < threshold ? 0 : dx < 0 ? 1 : -1;

export const swatchValue = (colors: ColorOption[], name: string): string =>
  colors.find((c) => c.name === name)?.value ?? colors[0].value;

export const lastItems = <T>(items: T[], count: number): T[] => items.slice(-count);

export const hiddenCount = (items: unknown[], shown: number): number =>
  Math.max(0, items.length - shown);

export const withoutLast = <T>(items: T[]): T[] => items.slice(0, -1);

export const addedMessage = (item: BasketItem): string =>
  `Added size ${item.size} in ${item.color}`;
