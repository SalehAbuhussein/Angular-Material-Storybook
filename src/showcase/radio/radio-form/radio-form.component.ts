import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { SPEED_OPTIONS } from './radio-form.constants';

/** A radio group bound with `formControlName`, plus a required validator. */
@Component({
  selector: 'docs-radio-form',
  imports: [MatRadioModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './radio-form.component.html',
  styleUrl: './radio-form.component.scss',
})
export class RadioForm {
  readonly _fb = inject(FormBuilder);
  readonly submitted = signal(false);

  readonly options = SPEED_OPTIONS;

  readonly form = this._fb.nonNullable.group({
    speed: ['', Validators.required],
  });
}
