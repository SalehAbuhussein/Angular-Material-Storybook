import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MEMBERS } from '../table-recipes.constants';
import { filterText } from '../table-recipes.utils';

/** The default filter: one string matched against every value in the row. */
@Component({
  selector: 'demo-default-filter',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './default-filter.component.html',
  styleUrl: './default-filter.component.scss',
})
export class DefaultFilter {
  readonly columns = ['name', 'email', 'team'];
  readonly dataSource = new MatTableDataSource(MEMBERS);

  applyFilter(event: Event): void {
    this.dataSource.filter = filterText(event);
  }
}
