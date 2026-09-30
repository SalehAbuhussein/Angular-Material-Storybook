import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { RELEASES } from '../table.constants';

/** Header stays put while the body scrolls, and the last column stays put while you scroll sideways. */
@Component({
  selector: 'demo-sticky-table',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './sticky-table.component.html',
  styleUrl: './sticky-table.component.scss',
})
export class StickyTable {
  readonly data = [...RELEASES, ...RELEASES];
  readonly columns = ['version', 'name', 'released', 'notes', 'actions'];
}
