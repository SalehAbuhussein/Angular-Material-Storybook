import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

/** A toggle group bound with `formControlName`. */
@Component({
  selector: 'docs-button-toggle-form',
  imports: [MatButtonToggleModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './button-toggle-form.component.html',
  styleUrl: './button-toggle-form.component.scss',
})
export class ButtonToggleForm {
  readonly _fb = inject(FormBuilder);

  readonly form = this._fb.nonNullable.group({
    view: ['grid'],
  });
}
