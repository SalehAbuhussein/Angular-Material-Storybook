import type { SurfaceStep } from './surface-levels.types';

export const SURFACE_STEPS: SurfaceStep[] = [
  { token: 'surface-dim', note: 'Dimmest neutral' },
  { token: 'surface', note: 'Page background' },
  { token: 'surface-bright', note: 'Brightest neutral' },
  { token: 'surface-container-lowest', note: 'Lowest container step' },
  { token: 'surface-container-low', note: 'A card on the page' },
  { token: 'surface-container', note: 'Standard container' },
  { token: 'surface-container-high', note: 'Raised container' },
  { token: 'surface-container-highest', note: 'Most prominent container' },
];
