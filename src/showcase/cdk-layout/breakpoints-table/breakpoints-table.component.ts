import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NO_MATCH } from '../cdk-layout.constants';
import { BREAKPOINT_NAMES } from './breakpoints-table.constants';
import { breakpointRows } from './breakpoints-table.utils';

/** Every named breakpoint and whether it currently matches. */
@Component({
  selector: 'demo-breakpoints-table',
  templateUrl: './breakpoints-table.component.html',
  styleUrl: './breakpoints-table.component.scss',
})
export class BreakpointsTable {
  _observer = inject(BreakpointObserver);

  _state = toSignal(this._observer.observe(Object.keys(BREAKPOINT_NAMES)), {
    initialValue: NO_MATCH,
  });

  readonly rows = computed(() => breakpointRows(BREAKPOINT_NAMES, this._state()));
}
