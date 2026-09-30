import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  type MatSnackBarHorizontalPosition,
  type MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

/** The four corners plus the two centre positions. */
@Component({
  selector: 'docs-snack-bar-position',
  imports: [MatButtonModule],
  templateUrl: './snack-bar-position.component.html',
})
export class SnackBarPosition {
  _snackBar = inject(MatSnackBar);

  /** Opens a snackbar at the given position, labelled with that position. */
  show(horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition): void {
    this._snackBar.open(`${verticalPosition} ${horizontalPosition}`, undefined, {
      duration: 2500,
      horizontalPosition,
      verticalPosition,
    });
  }
}
