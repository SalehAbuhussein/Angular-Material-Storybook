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

// Each shot shows the whole blouse or a close-up that still reads as a shirt.
export const SHOTS: Shot[] = [
  { id: 'front', label: 'Front', pose: 'front', view: '40 28 320 334', crop: false, alt: 'The blouse on a hanger, seen from the front' },
  { id: 'back', label: 'Back', pose: 'back', view: '40 28 320 334', crop: false, alt: 'The blouse on a hanger, seen from the back' },
  { id: 'collar', label: 'Collar', pose: 'front', view: '100 46 200 176', crop: false, alt: 'Close-up of the collar, yoke and pocket' },
  { id: 'folded', label: 'Folded', pose: 'folded', view: '96 84 208 262', crop: false, alt: 'The blouse folded flat' },
];

/** How many photos the carousel keeps in view; the last start shows the final two. */
export const VISIBLE_AT_END = 2;

/** A swipe shorter than this, in pixels, is treated as a tap. */
export const SWIPE_THRESHOLD = 40;

export const STARTING_BASKET: BasketItem[] = [
  { size: '04', color: 'Aqua' },
  { size: '08', color: 'Charcoal' },
];

/** How many items the basket pill shows before it switches to "+N". */
export const BASKET_PREVIEW_COUNT = 2;
