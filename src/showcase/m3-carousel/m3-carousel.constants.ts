import type { CarouselLayout, Slide } from './m3-carousel.types';

export const SLIDES: Slide[] = [
  { title: 'Lakeside', from: 'primary', to: 'tertiary-container' },
  { title: 'Canyon', from: 'tertiary', to: 'primary-container' },
  { title: 'Old town', from: 'secondary', to: 'surface-container-highest' },
  { title: 'Glacier', from: 'primary-container', to: 'inverse-surface' },
  { title: 'Harbour', from: 'on-primary-container', to: 'secondary-container' },
  { title: 'Orchard', from: 'tertiary-container', to: 'secondary' },
  { title: 'Dunes', from: 'error-container', to: 'tertiary' },
  { title: 'Night market', from: 'inverse-surface', to: 'primary' },
];

/** Relative widths of the visible slides, largest first. */
export const LAYOUTS: Record<CarouselLayout, number[]> = {
  'multi-browse': [6, 3, 1.2],
  hero: [8, 1.3],
  'full-screen': [1],
};

/** How far a pointer has to travel, in px, to count as a swipe. */
export const SWIPE_DISTANCE = 40;

/** A trackpad sends many wheel events per gesture; take one step per this many ms. */
export const WHEEL_STEP_MS = 400;
