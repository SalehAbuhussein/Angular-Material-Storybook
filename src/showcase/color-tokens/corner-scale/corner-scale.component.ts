import { Component } from '@angular/core';

import { CORNERS } from './corner-scale.constants';

/** The corner radius tokens, including the directional variants. */
@Component({
  selector: 'docs-corner-scale',
  templateUrl: './corner-scale.component.html',
  styleUrl: './corner-scale.component.scss',
})
export class CornerScale {
  readonly corners = CORNERS;
}
