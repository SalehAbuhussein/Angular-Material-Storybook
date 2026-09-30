export const SAMPLE_TEXT = 'Invoice 2041 is ready. Payment is due on 14 October.';

/**
 * Every class `mat.system-classes()` emits, by group. The names come from
 * node_modules/@angular/material/core/tokens/_classes.scss.
 */
export const BG = [
  'primary',
  'primary-container',
  'secondary',
  'secondary-container',
  'error',
  'error-container',
  'surface',
  'surface-variant',
  'surface-container-lowest',
  'surface-container-low',
  'surface-container',
  'surface-container-high',
  'surface-container-highest',
  'inverse-surface',
  'disabled',
];
export const TEXT = [
  'on-surface',
  'on-surface-variant',
  'primary',
  'secondary',
  'error',
  'disabled',
  'on-primary',
  'on-primary-container',
  'on-secondary',
  'on-secondary-container',
  'on-error',
  'on-error-container',
  'inverse-on-surface',
];
export const FONT = [
  'display-lg',
  'display-md',
  'display-sm',
  'headline-lg',
  'headline-md',
  'headline-sm',
  'title-lg',
  'title-md',
  'title-sm',
  'body-lg',
  'body-md',
  'body-sm',
  'label-lg',
  'label-md',
  'label-sm',
];
export const CORNER = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
export const BORDER = ['border', 'border-subtle'];
export const SHADOW = ['1', '2', '3', '4', '5'];

/** The text class that stays readable on each background class. */
export const PAIR: Record<string, string> = {
  primary: 'on-primary',
  'primary-container': 'on-primary-container',
  secondary: 'on-secondary',
  'secondary-container': 'on-secondary-container',
  error: 'on-error',
  'error-container': 'on-error-container',
  surface: 'on-surface',
  'surface-variant': 'on-surface-variant',
  'surface-container-lowest': 'on-surface',
  'surface-container-low': 'on-surface',
  'surface-container': 'on-surface',
  'surface-container-high': 'on-surface',
  'surface-container-highest': 'on-surface',
  'inverse-surface': 'inverse-on-surface',
  disabled: 'disabled',
};
