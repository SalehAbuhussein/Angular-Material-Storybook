import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/** A settings panel where each toggle applies the moment it is flipped. */
@Component({
  selector: 'docs-slide-toggle-settings',
  imports: [MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './slide-toggle-settings.component.html',
  styleUrl: './slide-toggle-settings.component.scss',
})
export class SlideToggleSettings {
  _fb = inject(FormBuilder);

  readonly form = this._fb.nonNullable.group({
    darkMode: [true],
    analytics: [false],
    beta: [false],
  });

  _value = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  readonly applied = computed(() => JSON.stringify(this._value()));
}
