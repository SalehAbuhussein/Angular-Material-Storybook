import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import type { UploadSnackBarData } from './upload-snack-bar.types';

/**
 * A custom snackbar body. `matSnackBarLabel`, `matSnackBarActions` and
 * `matSnackBarAction` keep the Material layout and spacing.
 */
@Component({
  selector: 'docs-upload-snack-bar',
  imports: [MatSnackBarModule, MatButtonModule, MatIconModule],
  templateUrl: './upload-snack-bar.component.html',
  styleUrl: './upload-snack-bar.component.scss',
})
export class UploadSnackBar {
  readonly ref = inject<MatSnackBarRef<UploadSnackBar>>(MatSnackBarRef);
  readonly data = inject<UploadSnackBarData>(MAT_SNACK_BAR_DATA);
}
