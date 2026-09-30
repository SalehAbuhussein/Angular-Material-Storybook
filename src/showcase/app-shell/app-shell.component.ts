import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs/operators';

import { NAV } from './app-shell.constants';
import type { DrawerMode, ForceMode, NavItem } from './app-shell.types';
import { drawerMode, navLabel } from './app-shell.utils';

/**
 * The frame every admin app ends up with: a toolbar across the top, a drawer on
 * the side, and one content region the router fills.
 */
@Component({
  selector: 'demo-app-shell',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShell {
  readonly _breakpoints = inject(BreakpointObserver);

  readonly height = input(640);
  /** Collapse the drawer to an icon rail instead of hiding it. */
  readonly railWhenClosed = input(false);
  readonly forceMode = input<ForceMode>('auto');

  readonly nav = NAV;
  readonly active = signal('dashboard');
  readonly drawerOpen = signal(true);

  readonly _drawer = viewChild<MatSidenav>('drawer');

  readonly isHandset = toSignal(
    this._breakpoints.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).pipe(map((s) => s.matches)),
    { initialValue: false },
  );

  readonly mode = computed<DrawerMode>(() => drawerMode(this.forceMode(), this.isHandset()));
  readonly opened = computed(() => (this.mode() === 'side' ? this.drawerOpen() : false));
  readonly rail = computed(() => this.railWhenClosed() && this.mode() === 'side');
  readonly activeLabel = computed(() => navLabel(NAV, this.active()));

  /** In `over` mode the sidenav owns its open state; in `side` mode the signal does. */
  toggle(): void {
    if (this.mode() === 'over') {
      void this._drawer()?.toggle();
    } else {
      this.drawerOpen.update((v) => !v);
    }
  }

  /** Makes the item active and closes a floating drawer. */
  select(item: NavItem): void {
    this.active.set(item.id);
    if (this.mode() === 'over') {
      void this._drawer()?.close();
    }
  }
}
