import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { observeHandset } from '../cdk-layout.utils';

/** A shell that switches the sidenav between `side` and `over` on one signal. */
@Component({
  selector: 'demo-responsive-shell',
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './responsive-shell.component.html',
  styleUrl: './responsive-shell.component.scss',
})
export class ResponsiveShell {
  _observer = inject(BreakpointObserver);

  readonly isHandset = toSignal(observeHandset(this._observer), { initialValue: false });
}
