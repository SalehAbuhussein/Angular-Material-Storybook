import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import type { ProfileData } from '../dialog.types';
import { ProfileDialog } from '../profile-dialog/profile-dialog.component';
import { STARTING_PROFILE } from './form-dialog-demo.constants';
import { profileLabel } from './form-dialog-demo.utils';

/** Trigger for the form dialog. */
@Component({
  selector: 'docs-form-dialog-demo',
  imports: [MatButtonModule],
  templateUrl: './form-dialog-demo.component.html',
})
export class FormDialogDemo {
  readonly _dialog = inject(MatDialog);
  readonly profile = signal(STARTING_PROFILE);
  readonly saved = signal(profileLabel(STARTING_PROFILE));

  /** Opens the form with the current profile and keeps what it saves; Cancel changes nothing. */
  edit() {
    const ref = this._dialog.open<ProfileDialog, ProfileData, ProfileData>(ProfileDialog, {
      width: '420px',
      data: this.profile(),
    });

    ref.afterClosed().subscribe((value) => {
      if (value) {
        this.profile.set(value);
        this.saved.set(profileLabel(value));
      }
    });
  }
}
