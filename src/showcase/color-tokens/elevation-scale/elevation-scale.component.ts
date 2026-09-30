import { Component } from '@angular/core';

import { ELEVATION_LEVELS } from './elevation-scale.constants';

/** The six elevation tokens on identical boxes. */
@Component({
  selector: 'docs-elevation-scale',
  templateUrl: './elevation-scale.component.html',
  styleUrl: './elevation-scale.component.scss',
})
export class ElevationScale {
  readonly levels = ELEVATION_LEVELS;
}
