import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { RELEASE } from '../dialog.constants';
import type { ReleaseData } from '../dialog.types';
import { MessageDialog } from '../message-dialog/message-dialog.component';

/** Trigger for the playground: every config option comes from the controls panel. */
@Component({
  selector: 'docs-dialog-playground',
  imports: [MatButtonModule],
  templateUrl: './dialog-playground.component.html',
})
export class DialogPlayground {
  readonly _dialog = inject(MatDialog);

  readonly width = input('420px');
  readonly disableClose = input(false);
  readonly autoFocus = input('first-tabbable');

  readonly result = signal<string | undefined>(undefined);

  /** Opens the message dialog with the current config and records what it closes with. */
  open() {
    const ref = this._dialog.open<MessageDialog, ReleaseData, string>(MessageDialog, {
      width: this.width(),
      disableClose: this.disableClose(),
      autoFocus: this.autoFocus(),
      data: RELEASE,
    });

    ref.afterClosed().subscribe((value) => this.result.set(value));
  }
}
