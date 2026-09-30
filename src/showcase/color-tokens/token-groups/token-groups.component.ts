import { Component, computed, input } from '@angular/core';

import { SwatchGrid } from '../swatch-grid/swatch-grid.component';
import { swatchesFor } from './token-groups.utils';

/** The playground wrapper: turns the selected group name into a token list. */
@Component({
  selector: 'docs-token-groups',
  imports: [SwatchGrid],
  templateUrl: './token-groups.component.html',
  styleUrl: './token-groups.component.scss',
})
export class TokenGroups {
  readonly group = input<string>('primary');
  readonly swatches = computed(() => swatchesFor(this.group()));
}
