import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * A checkbox in a reactive form is a boolean control. `Validators.requiredTrue`
 * is the one you want for "you must accept this".
 */
@Component({
  selector: 'docs-checkbox-form',
  imports: [MatCheckboxModule, MatButtonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './checkbox-form.component.html',
  styleUrl: './checkbox-form.component.scss',
})
export class CheckboxForm {
  readonly _fb = inject(FormBuilder);
  readonly submitted = signal(false);

  readonly form = this._fb.nonNullable.group({
    terms: [false, Validators.requiredTrue],
    newsletter: [true],
  });
}
