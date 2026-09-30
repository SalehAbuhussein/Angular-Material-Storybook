import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatSortModule, type Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { PACKAGES } from '../sorting.constants';
import type { Package } from '../sorting.types';
import { sortLabel, sortPackages } from './sort-change.utils';

/**
 * Without `MatTableDataSource` you own the sorting. `matSortChange` hands you the
 * column and direction; you fetch or reorder the rows yourself.
 */
@Component({
  selector: 'demo-sort-change',
  imports: [MatTableModule, MatSortModule, DecimalPipe],
  templateUrl: './sort-change.component.html',
  styleUrl: './sort-change.component.scss',
})
export class SortChange {
  readonly columns = ['name', 'downloads'];
  readonly rows = signal<Package[]>(PACKAGES);
  readonly lastSort = signal('none');

  /** Logs the event and reorders the rows to match it. */
  onSort(sort: Sort): void {
    this.lastSort.set(sortLabel(sort));
    this.rows.set(sortPackages(PACKAGES, sort));
  }
}
