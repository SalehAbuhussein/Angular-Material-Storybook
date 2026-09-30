import { Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

/** A multiple group reporting its array value. */
@Component({
  selector: 'docs-button-toggle-multiple',
  imports: [MatButtonToggleModule, MatIconModule],
  templateUrl: './button-toggle-multiple.component.html',
})
export class ButtonToggleMultiple {
  /**
   * Bound to `[value]` and never reassigned. In multiple mode the group emits a
   * brand new array from `valueChange`; feeding that array straight back into
   * `[value]` makes the group re-emit, and Angular reports NG0103 (infinite
   * change detection). Bind a stable reference in and read the signal out.
   */
  readonly initialFormat = ['bold'];
  readonly format = signal<string[]>(this.initialFormat);
}
