import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { BARS } from './tertiary-in-use.constants';

/**
 * Three places tertiary earns its keep: a recommended plan, a "new" marker
 * on a list, and one highlighted bar in a chart. Each sits next to primary
 * so you can see why a second hue helps.
 */
@Component({
  selector: 'docs-tertiary-in-use',
  imports: [MatButtonModule],
  templateUrl: './tertiary-in-use.component.html',
  styleUrl: './tertiary-in-use.component.scss',
})
export class TertiaryInUseDemo {
  readonly bars = BARS;
}
