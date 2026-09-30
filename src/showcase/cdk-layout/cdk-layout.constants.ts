import type { BreakpointState } from '@angular/cdk/layout';

/** What a breakpoint signal holds before the observer first reports. */
export const NO_MATCH: BreakpointState = { matches: false, breakpoints: {} };
