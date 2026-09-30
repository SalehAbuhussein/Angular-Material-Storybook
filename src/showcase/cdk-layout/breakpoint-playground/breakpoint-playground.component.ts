import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { NO_MATCH } from '../cdk-layout.constants';
import type { BreakpointName } from './breakpoint-playground.types';

/** Observe one query chosen from the controls panel and show whether it matches. */
@Component({
  selector: 'demo-breakpoint-playground',
  templateUrl: './breakpoint-playground.component.html',
  styleUrl: './breakpoint-playground.component.scss',
})
export class BreakpointPlayground {
  _observer = inject(BreakpointObserver);

  readonly breakpoint = input<BreakpointName>('Handset');
  readonly query = computed(() => Breakpoints[this.breakpoint()]);

  _state = toSignal(
    toObservable(this.query).pipe(switchMap((query) => this._observer.observe(query))),
    { initialValue: NO_MATCH },
  );

  readonly matches = computed(() => this._state().matches);
}
