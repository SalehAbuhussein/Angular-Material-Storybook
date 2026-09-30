import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { RELEASES } from '../table.constants';
import type { Release } from '../table.types';

/** A second row template holds the detail panel, revealed one row at a time. */
@Component({
  selector: 'demo-expandable-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './expandable-table.component.html',
  styleUrl: './expandable-table.component.scss',
})
export class ExpandableTable {
  readonly data = RELEASES;
  readonly columns = ['expand', 'version', 'name'];
  readonly expanded = signal<Release | null>(null);

  /** Opens the row, or closes it if it is already the open one. */
  toggle(row: Release): void {
    this.expanded.update((current) => (current === row ? null : row));
  }
}
