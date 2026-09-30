import { Component, OnDestroy, inject, input, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SIGN_IN_DELAY_MS, SIGN_IN_ERROR, WRONG_PASSWORD } from './login.constants';
import type { LoginField } from './login.types';

/**
 * A sign in screen: one centred card, two fields, and the three states every
 * auth form needs. Submitting with the password `wrongpass` fails on purpose.
 */
@Component({
  selector: 'demo-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class Login implements OnDestroy {
  _fb = inject(FormBuilder);

  readonly height = input(640);
  /** Start with the error banner visible, without having to submit. */
  readonly showError = input(false);

  readonly reveal = signal(false);
  readonly loading = signal(false);
  readonly succeeded = signal(false);
  // Follows the showError control, and submit() can still overwrite it.
  readonly error = linkedSignal<string | null>(() => (this.showError() ? SIGN_IN_ERROR : null));

  readonly form = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [true],
  });

  _events = toSignal(this.form.events, { initialValue: null });
  _requestTimer?: ReturnType<typeof setTimeout>;

  readonly submitted = signal(false);

  ngOnDestroy(): void {
    clearTimeout(this._requestTimer);
  }

  /** Errors appear only after the control has been touched, or after a submit. */
  show(control: LoginField, code: string): boolean {
    // Reading the form events makes this re-run whenever a control changes state.
    this._events();
    const c = this.form.controls[control];
    return c.hasError(code) && (c.touched || this.submitted());
  }

  /** Validates the form, then fakes a sign in request that fails for `wrongpass`. */
  submit(): void {
    this.submitted.set(true);
    this.error.set(null);
    this.succeeded.set(false);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this._requestTimer = setTimeout(() => {
      this.loading.set(false);
      if (this.form.controls.password.value === WRONG_PASSWORD) {
        this.error.set(SIGN_IN_ERROR);
      } else {
        this.succeeded.set(true);
      }
    }, SIGN_IN_DELAY_MS);
  }
}
