import { Component } from '@angular/core';

import { SURFACE_STEPS } from './surface-levels.constants';

/**
 * The surface ladder, stacked so the steps are visible. Text on every step is
 * `on-surface`, because the whole ladder is derived from the neutral palette
 * and shares one text colour.
 */
@Component({
  selector: 'docs-surface-levels',
  templateUrl: './surface-levels.component.html',
  styleUrl: './surface-levels.component.scss',
})
export class SurfaceLevelsDemo {
  readonly steps = SURFACE_STEPS;
}
