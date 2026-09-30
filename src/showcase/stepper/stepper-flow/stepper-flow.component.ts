import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import type { Resettable } from './stepper-flow.types';

/**
 * A linear stepper with no forms. Each step's `completed` is a signal the
 * component owns, and the buttons advance and reset the stepper from code.
 */
@Component({
  selector: 'demo-stepper-flow',
  imports: [MatStepperModule, MatButtonModule, MatIconModule],
  templateUrl: './stepper-flow.component.html',
})
export class StepperFlow {
  readonly reviewed = signal(false);
  readonly shipped = signal(false);
  readonly current = signal(0);

  /** Clears both steps and sends the stepper back to the first one. */
  restart(stepper: Resettable): void {
    this.reviewed.set(false);
    this.shipped.set(false);
    stepper.reset();
  }
}
