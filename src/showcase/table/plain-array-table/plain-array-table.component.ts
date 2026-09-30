import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { RELEASES } from '../table.constants';

/** The plainest table there is: an array straight into `[dataSource]`. */
@Component({
  selector: 'demo-plain-array-table',
  imports: [MatTableModule],
  templateUrl: './plain-array-table.component.html',
  styleUrl: './plain-array-table.component.scss',
})
export class PlainArrayTable {
  readonly data = RELEASES;
  readonly columns = ['version', 'name', 'released'];
}
