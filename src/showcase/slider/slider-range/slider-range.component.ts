import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { priceLabel } from './slider-range.utils';

/** A range slider reporting both ends. */
@Component({
  selector: 'docs-slider-range',
  imports: [MatSliderModule, FormsModule],
  templateUrl: './slider-range.component.html',
  styleUrl: './slider-range.component.scss',
})
export class SliderRange {
  readonly start = signal(120);
  readonly end = signal(380);

  readonly formatPrice = priceLabel;
}
