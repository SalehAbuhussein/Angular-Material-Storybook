import { Component, input } from '@angular/core';

import type { Swatch } from '../color-tokens.types';

/**
 * Renders a list of system colour tokens as tiles. The tile colour comes from
 * `var(--mat-sys-<token>)`, never from a hex value, so every tile follows the
 * theme and the light/dark switch. When a token has an `on-*` partner, real
 * text is drawn inside the tile using that partner so you can judge the
 * pairing.
 */
@Component({
  selector: 'docs-swatch-grid',
  templateUrl: './swatch-grid.component.html',
  styleUrl: './swatch-grid.component.scss',
})
export class SwatchGrid {
  readonly swatches = input.required<Swatch[]>();
}
