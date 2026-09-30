import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import type { ReleaseData } from '../dialog.types';

/** A plain content dialog used by the playground and the config story. */
@Component({
  selector: 'docs-message-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './message-dialog.component.html',
})
export class MessageDialog {
  readonly data = inject<ReleaseData>(MAT_DIALOG_DATA);
}
