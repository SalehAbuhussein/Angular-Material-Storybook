import type { Swatch } from './color-tokens.types';

export const PRIMARY: Swatch[] = [
  { token: 'primary', on: 'on-primary', note: 'The main accent. Filled buttons, active states.' },
  {
    token: 'primary-container',
    on: 'on-primary-container',
    note: 'A tinted block at less than full strength.',
  },
  { token: 'inverse-primary', note: 'Primary drawn on an inverted surface, such as a snackbar.' },
  { token: 'surface-tint', note: 'The tint colour elevation overlays are mixed from.' },
];

export const SURFACE: Swatch[] = [
  { token: 'surface', on: 'on-surface', note: 'The default page and panel background.' },
  {
    token: 'surface-variant',
    on: 'on-surface-variant',
    note: 'A muted fill. Its on-* partner is your secondary text colour.',
  },
  { token: 'surface-container-lowest', note: 'The lowest container step.' },
  { token: 'surface-container-low', note: 'A card sitting on the page.' },
  { token: 'surface-container', note: 'The standard container fill.' },
  { token: 'surface-container-high', note: 'A container that needs to stand out.' },
  { token: 'surface-container-highest', note: 'The most prominent container fill.' },
  { token: 'surface-dim', note: 'The dimmest variant of the surface.' },
  { token: 'surface-bright', note: 'The brightest variant of the surface.' },
  { token: 'background', on: 'on-background', note: 'Legacy alias of surface. Prefer surface.' },
];

export const SECONDARY_TERTIARY: Swatch[] = [
  { token: 'secondary', on: 'on-secondary', note: 'A supporting accent, less prominent than primary.' },
  {
    token: 'secondary-container',
    on: 'on-secondary-container',
    note: 'Selected chips and toggles use this.',
  },
  { token: 'tertiary', on: 'on-tertiary', note: 'A contrasting accent for highlights.' },
  {
    token: 'tertiary-container',
    on: 'on-tertiary-container',
    note: 'The tinted form of tertiary.',
  },
];

export const ERROR: Swatch[] = [
  { token: 'error', on: 'on-error', note: 'Destructive actions and invalid state.' },
  {
    token: 'error-container',
    on: 'on-error-container',
    note: 'An error banner or an invalid field fill.',
  },
];

export const OUTLINE_FIXED: Swatch[] = [
  { token: 'outline', note: 'Borders and dividers that should be visible.' },
  { token: 'outline-variant', note: 'Subtle dividers and disabled outlines.' },
  { token: 'shadow', note: 'The colour shadows are drawn in.' },
  { token: 'scrim', note: 'The dim layer behind a modal.' },
  {
    token: 'inverse-surface',
    on: 'inverse-on-surface',
    note: 'An inverted panel, such as a snackbar.',
  },
  { token: 'primary-fixed', on: 'on-primary-fixed', note: 'Same value in light and dark.' },
  {
    token: 'primary-fixed-dim',
    on: 'on-primary-fixed-variant',
    note: 'The dimmer half of the fixed pair.',
  },
  { token: 'secondary-fixed', on: 'on-secondary-fixed', note: 'Fixed secondary.' },
  {
    token: 'secondary-fixed-dim',
    on: 'on-secondary-fixed-variant',
    note: 'The dimmer half of fixed secondary.',
  },
  { token: 'tertiary-fixed', on: 'on-tertiary-fixed', note: 'Fixed tertiary.' },
  {
    token: 'tertiary-fixed-dim',
    on: 'on-tertiary-fixed-variant',
    note: 'The dimmer half of fixed tertiary.',
  },
];

export const GROUPS: Record<string, Swatch[]> = {
  primary: PRIMARY,
  surface: SURFACE,
  'secondary and tertiary': SECONDARY_TERTIARY,
  error: ERROR,
  'outline and fixed': OUTLINE_FIXED,
};
