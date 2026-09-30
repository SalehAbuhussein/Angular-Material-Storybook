import type { BreakpointState } from '@angular/cdk/layout';

import type { BreakpointRow } from './breakpoints-table.types';

/** One row per named query, with whether it matches in the given state. */
export const breakpointRows = (names: Record<string, string>, state: BreakpointState): BreakpointRow[] =>
  Object.entries(names).map(([query, name]) => ({
    name,
    query,
    matches: state.breakpoints[query] ?? false,
  }));
