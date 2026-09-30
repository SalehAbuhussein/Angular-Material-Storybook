import { DecimalPipe } from '@angular/common';
import { Component, Injector, OnInit, effect, inject, input, viewChild } from '@angular/core';
import { MatSort, MatSortModule, type SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { PACKAGES } from '../sorting.constants';

/** Sorting with a starting column and direction driven from the controls panel. */
@Component({
  selector: 'demo-sorting-playground',
  imports: [MatTableModule, MatSortModule, DecimalPipe],
  templateUrl: './sorting-playground.component.html',
  styleUrl: './sorting-playground.component.scss',
})
export class SortingPlayground implements OnInit {
  readonly sortActive = input<string>('downloads');
  readonly sortDirection = input<SortDirection>('desc');
  readonly disableClear = input(false);

  readonly columns = ['name', 'downloads', 'updated'];
  readonly dataSource = new MatTableDataSource(PACKAGES);

  _injector = inject(Injector);
  _sort = viewChild(MatSort);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Hands the table's `MatSort` to the data source. */
  initComponent(): void {
    this._initSort();
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
