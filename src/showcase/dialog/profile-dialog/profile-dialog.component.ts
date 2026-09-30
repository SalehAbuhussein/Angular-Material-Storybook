import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import type { ProfileData } from '../dialog.types';

/** A dialog whose content is a form. The result is the form value. */
@Component({
  selector: 'docs-profile-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './profile-dialog.component.html',
})
export class ProfileDialog {
  readonly _ref = inject<MatDialogRef<ProfileDialog>>(MatDialogRef);
  readonly _data = inject<ProfileData>(MAT_DIALOG_DATA);
  readonly _fb = inject(FormBuilder);

  readonly form = this._fb.nonNullable.group({
    name: [this._data.name, Validators.required],
    email: [this._data.email, [Validators.required, Validators.email]],
  });

  /** Closes with the form value, but only when it is valid. */
  save() {
    if (this.form.valid) {
      this._ref.close(this.form.getRawValue());
    }
  }
}
