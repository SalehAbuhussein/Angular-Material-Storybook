import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  type MatSnackBarHorizontalPosition,
  type MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

/**
 * Playground trigger. Every option comes from the controls panel. The outcome
 * line shows which of onAction / afterDismissed fired.
 */
@Component({
  selector: 'docs-snack-bar-playground',
  imports: [MatButtonModule],
  templateUrl: './snack-bar-playground.component.html',
})
export class SnackBarPlayground {
  _snackBar = inject(MatSnackBar);

  readonly message = input('Draft saved');
  readonly action = input('Undo');
  readonly duration = input(4000);
  readonly horizontalPosition = input<MatSnackBarHorizontalPosition>('center');
  readonly verticalPosition = input<MatSnackBarVerticalPosition>('bottom');

  readonly outcome = signal('nothing yet');

  /** Opens a snackbar with the current options and records how it closed. */
  show(): void {
    const ref = this._snackBar.open(this.message(), this.action() || undefined, {
      duration: this.duration(),
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
    });

    ref.onAction().subscribe(() => this.outcome.set('action clicked'));
    ref.afterDismissed().subscribe((info) => {
      if (!info.dismissedByAction) {
        this.outcome.set('dismissed by timeout');
      }
    });
  }
}
