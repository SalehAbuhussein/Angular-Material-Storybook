import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

/**
 * A linear stepper where each step is a form group. The Next button refuses to
 * advance while the step's `[stepControl]` is invalid.
 */
@Component({
  selector: 'demo-linear-stepper',
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './linear-stepper.component.html',
})
export class LinearStepper {
  _fb = inject(FormBuilder);

  readonly account = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly profile = this._fb.nonNullable.group({
    name: ['', Validators.required],
  });
}
