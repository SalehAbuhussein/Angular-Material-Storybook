import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { PLANS } from './ripple-card.constants';

/** A card-shaped control of your own, with a ripple and real keyboard support. */
@Component({
  selector: 'docs-ripple-card',
  imports: [MatRippleModule, MatIconModule],
  templateUrl: './ripple-card.component.html',
})
export class RippleCard {
  readonly plans = PLANS;
  chosen = 'nothing yet';

  choose(name: string): void {
    this.chosen = name;
  }
}
