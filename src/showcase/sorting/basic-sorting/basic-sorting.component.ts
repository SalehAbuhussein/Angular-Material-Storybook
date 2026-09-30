import { DecimalPipe } from '@angular/common';
import { Component, Injector, OnInit, effect, inject, viewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { PACKAGES } from '../sorting.constants';

/** Two directives and nothing else: `matSort` on the table, `mat-sort-header` on the headers. */
@Component({
  selector: 'demo-basic-sorting',
  imports: [MatTableModule, MatSortModule, DecimalPipe],
  templateUrl: './basic-sorting.component.html',
  styleUrl: './basic-sorting.component.scss',
})
export class BasicSorting implements OnInit {
  readonly columns = ['name', 'downloads', 'size'];
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
