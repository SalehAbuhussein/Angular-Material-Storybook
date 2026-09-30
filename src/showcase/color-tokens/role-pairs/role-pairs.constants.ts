import type { RolePair } from './role-pairs.types';

export const ROLE_PAIRS: RolePair[] = [
  { token: 'primary', on: 'on-primary' },
  { token: 'primary-container', on: 'on-primary-container' },
  { token: 'secondary', on: 'on-secondary' },
  { token: 'secondary-container', on: 'on-secondary-container' },
  { token: 'tertiary', on: 'on-tertiary' },
  { token: 'tertiary-container', on: 'on-tertiary-container' },
  { token: 'error', on: 'on-error' },
  { token: 'error-container', on: 'on-error-container' },
  { token: 'surface', on: 'on-surface' },
  { token: 'surface-variant', on: 'on-surface-variant' },
  { token: 'background', on: 'on-background' },
  { token: 'inverse-surface', on: 'inverse-on-surface' },
];
