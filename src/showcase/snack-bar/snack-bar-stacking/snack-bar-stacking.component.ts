import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Three calls in a row, to show that only the last one survives. */
@Component({
  selector: 'docs-snack-bar-stacking',
  imports: [MatButtonModule],
  templateUrl: './snack-bar-stacking.component.html',
})
export class SnackBarStacking {
  _snackBar = inject(MatSnackBar);

  spam(): void {
    this._snackBar.open('First', undefined, { duration: 3000 });
    this._snackBar.open('Second', undefined, { duration: 3000 });
    this._snackBar.open('Third wins', undefined, { duration: 3000 });
  }
}
