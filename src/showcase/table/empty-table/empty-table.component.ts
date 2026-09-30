import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { RELEASES } from '../table.constants';
import type { Release } from '../table.types';

/** `matNoDataRow` renders only when the data source hands the table zero rows. */
@Component({
  selector: 'demo-empty-table',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './empty-table.component.html',
  styleUrl: './empty-table.component.scss',
})
export class EmptyTable {
  readonly columns = ['version', 'name'];
  readonly dataSource = new MatTableDataSource<Release>([]);

  toggleData(): void {
    this.dataSource.data = this.dataSource.data.length ? [] : RELEASES;
  }
}
