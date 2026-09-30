import { Component, computed, signal } from '@angular/core';
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { TICKETS } from '../pagination.constants';
import { pageOf } from './server-paging.utils';

/**
 * Server-side paging: the table holds one page, `length` comes from the server
 * and the `page` event triggers the next fetch.
 */
@Component({
  selector: 'demo-server-paging',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './server-paging.component.html',
  styleUrl: './server-paging.component.scss',
})
export class ServerPaging {
  readonly columns = ['id', 'title'];
  readonly total = signal(TICKETS.length);
  readonly pageIndex = signal(0);
  readonly pageSize = signal(5);

  // Stands in for an HTTP call that returns one page of rows.
  readonly rows = computed(() => pageOf(TICKETS, this.pageIndex(), this.pageSize()));

  /** Stores the requested page, which re-runs the fake fetch. */
  onPage(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
