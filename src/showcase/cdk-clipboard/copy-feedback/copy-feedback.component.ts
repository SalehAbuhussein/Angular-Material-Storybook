import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { copyResultMessage } from './copy-feedback.utils';

/** A copy that says so: the `copied` output drives a snackbar. */
@Component({
  selector: 'demo-copy-feedback',
  imports: [ClipboardModule, MatButtonModule, MatIconModule],
  templateUrl: './copy-feedback.component.html',
  styleUrl: './copy-feedback.component.scss',
})
export class CopyFeedback implements OnDestroy {
  readonly apiKey = 'sk_live_7Qa1ZxR4mB8vN2pL';
  readonly justCopied = signal(false);

  _snackBar = inject(MatSnackBar);
  _resetTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this._resetTimer);
  }

  /** Reports the result, and on success shows a check mark for two seconds. */
  onCopied(success: boolean): void {
    this._snackBar.open(copyResultMessage(success), 'Dismiss', { duration: 3000 });

    if (success) {
      this.justCopied.set(true);
      this._resetTimer = setTimeout(() => this.justCopied.set(false), 2000);
    }
  }
}
