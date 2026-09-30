import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { passwordsMatch, submittedJson } from './forms-overview.utils';

/**
 * One complete signup form: `FormBuilder`, validators, `mat-error` messages,
 * a disabled submit button, and a result panel.
 */
@Component({
  selector: 'docs-signup-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forms-overview.component.html',
  styleUrl: './forms-overview.component.scss',
})
export class FormsOverview {
  readonly _fb = inject(FormBuilder);
  readonly submitting = signal(false);
  readonly result = signal<string | null>(null);

  readonly form = this._fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    passwords: this._fb.nonNullable.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm: ['', Validators.required],
      },
      { validators: passwordsMatch },
    ),
    source: ['', Validators.required],
    plan: ['free'],
    newsletter: [true],
    terms: [false, Validators.requiredTrue],
  });

  readonly passwords = this.form.controls.passwords;

  /** Shows every error at once when the form is invalid, the masked values when it is not. */
  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.result.set(null);
      return;
    }

    this.result.set(submittedJson(this.form.getRawValue()));
  }

  reset() {
    this.form.reset();
    this.result.set(null);
  }
}
