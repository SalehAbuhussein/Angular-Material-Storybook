import { Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SAVE_DELAY_MS } from './spinner-in-button.constants';

/**
 * A save button that shows a spinner while the request is in flight. `MatButton`
 * has a `showProgress` input and a `progressIndicator` slot for exactly this.
 */
@Component({
  selector: 'docs-spinner-in-button',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './spinner-in-button.component.html',
})
export class SpinnerInButton implements OnDestroy {
  readonly saving = signal(false);
  readonly status = signal('');

  _saveTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this._saveTimer);
  }

  /** Shows the spinner, then reports "Saved" when the fake request finishes. */
  save(): void {
    this.saving.set(true);
    this.status.set('');
    this._saveTimer = setTimeout(() => {
      this.saving.set(false);
      this.status.set('Saved');
    }, SAVE_DELAY_MS);
  }
}
