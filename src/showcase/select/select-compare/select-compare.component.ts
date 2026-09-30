import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { TEAMS } from './select-compare.constants';
import type { Team } from './select-compare.types';
import { sameTeamId } from './select-compare.utils';

/**
 * `compareWith` tells the select how to match the bound value against the
 * option values. Without it, two objects with the same contents are different
 * values and nothing preselects.
 */
@Component({
  selector: 'docs-select-compare',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './select-compare.component.html',
  styleUrl: './select-compare.component.scss',
})
export class SelectCompare {
  readonly teams = TEAMS;

  // A fresh object, not a reference from `teams`.
  selected: Team = { id: 2, name: 'Growth' };

  compareById = sameTeamId;
}
