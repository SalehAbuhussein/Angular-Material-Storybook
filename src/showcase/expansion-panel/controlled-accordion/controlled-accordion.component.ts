import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { NONE_OPEN, STEPS } from './controlled-accordion.constants';

/** A wizard where the open step is driven by a signal, not by user clicks alone. */
@Component({
  selector: 'docs-controlled-accordion',
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './controlled-accordion.component.html',
})
export class ControlledAccordion {
  readonly steps = STEPS;
  readonly open = signal(0);

  /** Keeps the signal honest when the user collapses the panel they are on. */
  collapse(index: number): void {
    if (this.open() === index) {
      this.open.set(NONE_OPEN);
    }
  }
}
