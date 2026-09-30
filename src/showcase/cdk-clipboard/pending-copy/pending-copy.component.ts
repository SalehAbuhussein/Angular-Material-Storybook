import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { buildReport } from './pending-copy.utils';

/** Large text: prepare the copy first, then finish it, then clean up. */
@Component({
  selector: 'demo-pending-copy',
  imports: [MatButtonModule],
  templateUrl: './pending-copy.component.html',
  styleUrl: './pending-copy.component.scss',
})
export class PendingCopy {
  _clipboard = inject(Clipboard);
  _report = buildReport(4000);

  readonly size = this._report.length;
  readonly status = signal('Not copied yet.');

  /** Tries the copy up to three times, then reports whether it worked. */
  copyReport(): void {
    const pending = this._clipboard.beginCopy(this._report);
    let remaining = 3;

    const attempt = () => {
      const copied = pending.copy();

      if (!copied && --remaining) {
        setTimeout(attempt);
        return;
      }

      // Always destroy, whether or not the copy worked.
      pending.destroy();
      this.status.set(copied ? 'Copied the whole report.' : 'The browser refused the copy.');
    };

    attempt();
  }
}
