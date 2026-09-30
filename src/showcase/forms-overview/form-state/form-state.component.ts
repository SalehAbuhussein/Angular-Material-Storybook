import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { controlState } from './form-state.utils';

/** A read-only panel showing the form's live state, for the docs page. */
@Component({
  selector: 'docs-form-state',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form-state.component.html',
  styleUrl: './form-state.component.scss',
})
export class FormState {
  readonly control = inject(FormBuilder).control('', [Validators.required, Validators.email]);

  readonly _changes = toSignal(this.control.events, { initialValue: null });

  readonly state = computed(() => {
    this._changes();
    return controlState(this.control);
  });
}
