import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UploadSnackBar } from '../upload-snack-bar/upload-snack-bar.component';

/** A custom component as the snackbar body, opened with `openFromComponent`. */
@Component({
  selector: 'docs-snack-bar-custom',
  imports: [MatButtonModule],
  templateUrl: './snack-bar-custom.component.html',
})
export class SnackBarCustom {
  _snackBar = inject(MatSnackBar);

  show(): void {
    this._snackBar.openFromComponent(UploadSnackBar, {
      duration: 5000,
      data: { file: 'report-q3.pdf' },
      panelClass: 'docs-snack-bar-success',
    });
  }
}
