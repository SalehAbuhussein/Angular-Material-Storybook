import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { RELEASE } from '../dialog.constants';
import { MessageDialog } from '../message-dialog/message-dialog.component';

/** Two triggers that differ only in config, so the effect of each option is visible. */
@Component({
  selector: 'docs-dialog-config-demo',
  imports: [MatButtonModule],
  templateUrl: './dialog-config-demo.component.html',
})
export class DialogConfigDemo {
  readonly _dialog = inject(MatDialog);

  wide() {
    this._dialog.open(MessageDialog, { width: '640px', data: RELEASE });
  }

  locked() {
    this._dialog.open(MessageDialog, { width: '420px', disableClose: true, data: RELEASE });
  }

  focusDialog() {
    this._dialog.open(MessageDialog, { width: '420px', autoFocus: 'dialog', data: RELEASE });
  }
}
