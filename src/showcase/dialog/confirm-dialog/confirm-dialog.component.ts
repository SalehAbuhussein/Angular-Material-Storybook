import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import type { ConfirmData } from '../dialog.types';

/**
 * A reusable confirm dialog. It knows nothing about the caller: everything it
 * shows arrives through `MAT_DIALOG_DATA` and it answers with `true` or `false`.
 */
@Component({
  selector: 'docs-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialog {
  readonly data = inject<ConfirmData>(MAT_DIALOG_DATA);
}
