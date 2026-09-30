import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** A range picker with two controls in one group. */
@Component({
  selector: 'docs-datepicker-range',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './datepicker-range.component.html',
  styleUrl: './datepicker-range.component.scss',
})
export class DatepickerRange {
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
