import { A11yModule } from '@angular/cdk/a11y';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** `cdkTrapFocus` keeps Tab inside the panel while it is open. */
@Component({
  selector: 'demo-focus-trap',
  imports: [A11yModule, MatButtonModule],
  templateUrl: './focus-trap.component.html',
  styleUrl: './focus-trap.component.scss',
})
export class FocusTrapDemo {
  readonly open = signal(false);
}
