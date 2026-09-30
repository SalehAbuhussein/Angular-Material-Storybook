import { Breakpoints } from '@angular/cdk/layout';

/** Every named breakpoint query, mapped to its name in `Breakpoints`. */
export const BREAKPOINT_NAMES: Record<string, string> = {
  [Breakpoints.XSmall]: 'XSmall',
  [Breakpoints.Small]: 'Small',
  [Breakpoints.Medium]: 'Medium',
  [Breakpoints.Large]: 'Large',
  [Breakpoints.XLarge]: 'XLarge',
  [Breakpoints.Handset]: 'Handset',
  [Breakpoints.Tablet]: 'Tablet',
  [Breakpoints.Web]: 'Web',
};
