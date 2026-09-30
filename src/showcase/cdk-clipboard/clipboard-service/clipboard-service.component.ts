import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MEMBERS } from './clipboard-service.constants';
import { toCsv, toJson } from './clipboard-service.utils';

/** The service, for copying something you build in TypeScript. */
@Component({
  selector: 'demo-clipboard-service',
  imports: [MatButtonModule],
  templateUrl: './clipboard-service.component.html',
  styleUrl: './clipboard-service.component.scss',
})
export class ClipboardService {
  readonly preview = signal('Press a button to build and copy a payload.');

  _clipboard = inject(Clipboard);
  _snackBar = inject(MatSnackBar);

  copyAsJson(): void {
    this._write(toJson(MEMBERS));
  }

  copyAsCsv(): void {
    this._write(toCsv(MEMBERS));
  }

  /** Copies the value, shows it in the preview and reports the result. */
  _write(value: string): void {
    const success = this._clipboard.copy(value);
    this.preview.set(value);
    this._snackBar.open(success ? 'Copied' : 'Copy failed', undefined, { duration: 2000 });
  }
}
