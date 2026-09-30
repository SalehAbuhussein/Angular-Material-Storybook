import { OverlayModule, type ScrollStrategy } from '@angular/cdk/overlay';
import { Component, Injector, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import type { ScrollKind } from './overlay-scroll.types';
import { createScrollStrategy } from './overlay-scroll.utils';

/** One overlay, three scroll strategies, inside a scrollable box. */
@Component({
  selector: 'docs-overlay-scroll',
  imports: [OverlayModule, MatButtonModule],
  templateUrl: './overlay-scroll.component.html',
  styleUrl: '../overlay-panel.scss',
})
export class OverlayScroll {
  _injector = inject(Injector);

  readonly isOpen = signal(false);
  readonly active = signal<ScrollKind>('reposition');
  readonly strategy = signal<ScrollStrategy>(createScrollStrategy('reposition', this._injector));

  /** Closes the panel and swaps in a new scroll strategy for the next open. */
  use(kind: ScrollKind) {
    this.isOpen.set(false);
    this.active.set(kind);
    this.strategy.set(createScrollStrategy(kind, this._injector));
  }
}
