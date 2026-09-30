import { Component, input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { RELEASES } from '../table.constants';

/**
 * The same table driven by `MatTableDataSource`, with a footer row and inputs
 * the controls panel can drive.
 */
@Component({
  selector: 'demo-table-playground',
  imports: [MatTableModule],
  templateUrl: './table-playground.component.html',
  styleUrl: './table-playground.component.scss',
})
export class TablePlayground {
  readonly displayedColumns = input<string[]>(['version', 'name', 'released', 'status']);
  readonly showFooter = input(false);
  readonly dataSource = new MatTableDataSource(RELEASES);
}
