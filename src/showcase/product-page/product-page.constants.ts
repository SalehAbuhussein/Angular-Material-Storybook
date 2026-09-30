import type { BasketItem, ColorOption, Destination, Shot } from './product-page.types';

export const SIZES = ['00', '02', '04', '06', '08', '10', '12', '14'];

export const COLORS: ColorOption[] = [
  { name: 'Charcoal', value: '#1d1b1e' },
  { name: 'Peach', value: '#fbd5a8' },
  { name: 'Aqua', value: '#9ee6e6' },
];

export const DESTINATIONS: Destination[] = [
  { icon: 'diamond', label: 'Featured' },
  { icon: 'weekend', label: 'Apartment' },
  { icon: 'watch', label: 'Accessories' },
  { icon: 'checkroom', label: 'Apparel' },
  { icon: 'emoji_objects', label: 'Objects' },
];

// One drawing, three crops: the whole blouse, the collar, the pocket.
export const SHOTS: Shot[] = [
  { kind: 'full', view: '40 28 320 334', alt: 'The blouse on a hanger, seen from the front' },
  { kind: 'collar', view: '150 76 100 100', alt: 'Close-up of the collar and top button' },
  { kind: 'detail', view: '136 136 96 72', alt: 'Detail of the pocket and placket buttons' },
];

export const STARTING_BASKET: BasketItem[] = [
  { size: '04', color: 'Aqua' },
  { size: '08', color: 'Charcoal' },
];

/** How many items the basket pill shows before it switches to "+N". */
export const BASKET_PREVIEW_COUNT = 2;
