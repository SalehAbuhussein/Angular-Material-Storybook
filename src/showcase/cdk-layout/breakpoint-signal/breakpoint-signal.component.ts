import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

import { observeHandset } from '../cdk-layout.utils';

/** `toSignal` turns the breakpoint stream into a signal you can read anywhere. */
@Component({
  selector: 'demo-breakpoint-signal',
  imports: [MatIconModule],
  templateUrl: './breakpoint-signal.component.html',
  styleUrl: './breakpoint-signal.component.scss',
})
export class BreakpointSignal {
  _observer = inject(BreakpointObserver);

  readonly isHandset = toSignal(observeHandset(this._observer), { initialValue: false });

  readonly columns = computed(() => (this.isHandset() ? 1 : 3));
}
