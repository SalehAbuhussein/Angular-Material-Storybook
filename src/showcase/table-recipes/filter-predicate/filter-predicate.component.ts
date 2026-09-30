import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MEMBERS } from '../table-recipes.constants';
import { filterText } from '../table-recipes.utils';
import { nameOrRoleMatches } from './filter-predicate.utils';

/**
 * A custom `filterPredicate` searches only the name column and reads a
 * structured filter, so `role:owner` filters on the role instead.
 */
@Component({
  selector: 'demo-filter-predicate',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './filter-predicate.component.html',
  styleUrl: './filter-predicate.component.scss',
})
export class FilterPredicate implements OnInit {
  readonly columns = ['name', 'email', 'role'];
  readonly dataSource = new MatTableDataSource(MEMBERS);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Swaps in the custom filter predicate. */
  initComponent(): void {
    this._initFilterPredicate();
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = filterText(event);
  }

  _initFilterPredicate(): void {
    this.dataSource.filterPredicate = nameOrRoleMatches;
  }
}
