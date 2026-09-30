import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import type { ConfirmData } from '../dialog.types';
import { DELETE_INVOICE } from './confirm-demo.constants';
import { deleteStatus } from './confirm-demo.utils';

/** Trigger for the confirm dialog, showing the boolean it returns. */
@Component({
  selector: 'docs-confirm-demo',
  imports: [MatButtonModule],
  templateUrl: './confirm-demo.component.html',
})
export class ConfirmDemo {
  readonly _dialog = inject(MatDialog);
  readonly status = signal('Nothing deleted.');

  /** Asks for confirmation and reports the answer. */
  deleteItem() {
    const ref = this._dialog.open<ConfirmDialog, ConfirmData, boolean>(ConfirmDialog, {
      width: '360px',
      data: DELETE_INVOICE,
    });

    ref.afterClosed().subscribe((confirmed) => {
      this.status.set(deleteStatus(confirmed));
    });
  }
}
