import { Component, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DEFAULT_OPTIONS } from './m3-split-button.constants';
import type { SplitAppearance, SplitSize } from './m3-split-button.types';

/**
 * The M3 split button: a main action and a menu of related actions, joined
 * with a 2px gap and small inner corners. While the menu is open the trailing
 * half turns into a full circle and its chevron flips.
 *
 * The menu is a real `mat-menu`, so focus, arrow keys, Escape and closing on
 * outside click all come from Angular Material.
 */
@Component({
  selector: 'm3-split-button',
  imports: [MatIconModule, MatMenuModule, MatRippleModule, MatSnackBarModule],
  templateUrl: './m3-split-button.component.html',
  styleUrl: './m3-split-button.component.scss',
})
export class M3SplitButton {
  readonly _snackBar = inject(MatSnackBar);

  readonly label = input('Send');
  readonly icon = input('send');
  readonly appearance = input<SplitAppearance>('filled');
  readonly size = input<SplitSize>('md');
  readonly options = input(DEFAULT_OPTIONS);

  readonly open = signal(false);

  /** Stands in for the real action by announcing it in a snackbar. */
  run(action: string): void {
    this._snackBar.open(action, undefined, { duration: 1600 });
  }
}
