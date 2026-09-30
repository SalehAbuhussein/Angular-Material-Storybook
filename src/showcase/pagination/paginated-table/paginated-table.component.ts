import { Component, Injector, OnInit, effect, inject, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TICKETS } from '../pagination.constants';

/** `MatTableDataSource` slices the rows once you hand it the paginator. */
@Component({
  selector: 'demo-paginated-table',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './paginated-table.component.html',
  styleUrl: './paginated-table.component.scss',
})
export class PaginatedTable implements OnInit {
  readonly columns = ['id', 'title', 'owner'];
  readonly dataSource = new MatTableDataSource(TICKETS);

  _injector = inject(Injector);
  _paginator = viewChild(MatPaginator);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Hands the paginator to the data source. */
  initComponent(): void {
    this._initPaginator();
  }

  _initPaginator(): void {
    effect(
      () => {
        this.dataSource.paginator = this._paginator() ?? null;
      },
      { injector: this._injector },
    );
  }
}
