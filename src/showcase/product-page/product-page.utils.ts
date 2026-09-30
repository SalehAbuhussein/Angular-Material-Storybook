import type { BasketItem, ColorOption } from './product-page.types';

export const swatchValue = (colors: ColorOption[], name: string): string =>
  colors.find((c) => c.name === name)?.value ?? colors[0].value;

export const lastItems = <T>(items: T[], count: number): T[] => items.slice(-count);

export const hiddenCount = (items: unknown[], shown: number): number =>
  Math.max(0, items.length - shown);

export const withoutLast = <T>(items: T[]): T[] => items.slice(0, -1);

export const addedMessage = (item: BasketItem): string =>
  `Added size ${item.size} in ${item.color}`;
