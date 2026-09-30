import { Component, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRipple, MatRippleModule } from '@angular/material/core';

/** Launching a ripple from code with the directive's exported instance. */
@Component({
  selector: 'docs-ripple-manual',
  imports: [MatRippleModule, MatButtonModule],
  templateUrl: './ripple-manual.component.html',
})
export class RippleManual {
  readonly _target = viewChild.required<MatRipple>('target');

  /** Fires one centred ripple on the target, which ignores pointer ripples. */
  ping(): void {
    this._target().launch({ centered: true, persistent: false });
  }
}
