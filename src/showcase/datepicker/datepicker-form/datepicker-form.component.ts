import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** A required date in a reactive form, with an error message. */
@Component({
  selector: 'docs-datepicker-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './datepicker-form.component.html',
  styleUrl: './datepicker-form.component.scss',
})
export class DatepickerForm {
  readonly _fb = inject(FormBuilder);
  readonly today = new Date();

  readonly form = this._fb.group({
    startDate: new FormControl<Date | null>(null, Validators.required),
  });
}
