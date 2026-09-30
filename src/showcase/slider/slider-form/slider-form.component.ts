import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { percentLabel } from './slider-form.utils';

/** A slider bound to a reactive form control, with a live readout. */
@Component({
  selector: 'docs-slider-form',
  imports: [MatSliderModule, ReactiveFormsModule],
  templateUrl: './slider-form.component.html',
  styleUrl: './slider-form.component.scss',
})
export class SliderForm {
  readonly _fb = inject(FormBuilder);

  readonly form = this._fb.nonNullable.group({
    volume: [40],
  });

  readonly formatPercent = percentLabel;
}
