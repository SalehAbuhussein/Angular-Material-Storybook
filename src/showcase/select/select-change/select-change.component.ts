import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ENVIRONMENTS } from './select-change.constants';

/** A select that reports what changed. */
@Component({
  selector: 'docs-select-change',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './select-change.component.html',
  styleUrl: './select-change.component.scss',
})
export class SelectChange {
  readonly envs = ENVIRONMENTS;
  readonly last = signal<string | null>(null);
}
