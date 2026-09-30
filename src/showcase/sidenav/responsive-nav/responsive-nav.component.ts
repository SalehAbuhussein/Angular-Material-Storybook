import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { map } from 'rxjs/operators';

/**
 * A responsive app shell: `BreakpointObserver` picks the drawer mode and its
 * initial open state, and the menu button only shows on handset widths.
 */
@Component({
  selector: 'demo-responsive-nav',
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './responsive-nav.component.html',
})
export class ResponsiveNav {
  readonly _breakpoints = inject(BreakpointObserver);

  readonly isHandset = toSignal(
    this._breakpoints.observe(Breakpoints.Handset).pipe(map((state) => state.matches)),
    { initialValue: false },
  );
}
