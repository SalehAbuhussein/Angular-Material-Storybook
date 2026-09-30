import { GROUPS, PRIMARY } from '../color-tokens.constants';
import type { Swatch } from '../color-tokens.types';

export const swatchesFor = (group: string): Swatch[] => GROUPS[group] ?? PRIMARY;
