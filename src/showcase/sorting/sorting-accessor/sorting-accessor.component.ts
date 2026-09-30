import { Component, Injector, OnInit, effect, inject, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { PACKAGES } from '../sorting.constants';
import { sortValue } from './sorting-accessor.utils';

/**
 * `size` is a string like `4.8 MB`, so the default accessor sorts it
 * alphabetically. A `sortingDataAccessor` turns it into a number first.
 */
@Component({
  selector: 'demo-sorting-accessor',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './sorting-accessor.component.html',
  styleUrl: './sorting-accessor.component.scss',
})
export class SortingAccessor implements OnInit {
  readonly columns = ['name', 'size'];
  readonly dataSource = new MatTableDataSource(PACKAGES);

  _injector = inject(Injector);
  _sort = viewChild(MatSort);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Installs the custom accessor and hands the table's `MatSort` to the data source. */
  initComponent(): void {
    this._initAccessor();
    this._initSort();
  }

  _initAccessor(): void {
    this.dataSource.sortingDataAccessor = sortValue;
  }

  _initSort(): void {
    effect(
      () => {
        this.dataSource.sort = this._sort() ?? null;
      },
      { injector: this._injector },
    );
  }
}
