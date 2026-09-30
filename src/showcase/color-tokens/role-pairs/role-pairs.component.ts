import { Component } from '@angular/core';

import { ROLE_PAIRS } from './role-pairs.constants';

/** Every role token beside its `on-*` partner, with text drawn on both halves. */
@Component({
  selector: 'docs-role-pairs',
  templateUrl: './role-pairs.component.html',
  styleUrl: './role-pairs.component.scss',
})
export class RolePairsDemo {
  readonly pairs = ROLE_PAIRS;
}
