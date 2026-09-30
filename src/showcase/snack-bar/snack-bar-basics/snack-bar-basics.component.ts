import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Message only versus message plus action. */
@Component({
  selector: 'docs-snack-bar-basics',
  imports: [MatButtonModule],
  templateUrl: './snack-bar-basics.component.html',
})
export class SnackBarBasics {
  _snackBar = inject(MatSnackBar);

  plain(): void {
    this._snackBar.open('Settings saved', undefined, { duration: 3000 });
  }

  /** Offers an Undo that confirms with a second snackbar. */
  withAction(): void {
    const ref = this._snackBar.open('Message archived', 'Undo', { duration: 6000 });
    ref.onAction().subscribe(() => this._snackBar.open('Restored', undefined, { duration: 2000 }));
  }
}
