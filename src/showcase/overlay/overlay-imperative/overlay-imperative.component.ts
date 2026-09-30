import {
  createBlockScrollStrategy,
  createGlobalPositionStrategy,
  createOverlayRef,
  type OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Injector, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { OverlayCard } from '../overlay-card/overlay-card.component';

/** No directive at all: build the overlay from code. */
@Component({
  selector: 'docs-overlay-imperative',
  imports: [MatButtonModule],
  templateUrl: './overlay-imperative.component.html',
})
export class OverlayImperative implements OnDestroy {
  _injector = inject(Injector);
  _ref?: OverlayRef;

  ngOnDestroy(): void {
    this._ref?.dispose();
  }

  /** Replaces any open overlay with a new centred one that closes on a backdrop click. */
  open() {
    this._ref?.dispose();

    this._ref = createOverlayRef(this._injector, {
      positionStrategy: createGlobalPositionStrategy(this._injector).centerHorizontally().top('80px'),
      scrollStrategy: createBlockScrollStrategy(this._injector),
      hasBackdrop: true,
    });

    this._ref.attach(new ComponentPortal(OverlayCard));
    this._ref.backdropClick().subscribe(() => this._ref?.dispose());
  }
}
