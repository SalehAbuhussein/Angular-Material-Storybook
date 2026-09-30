import { SelectionModel } from '@angular/cdk/collections';
import { Component, computed, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MEMBERS } from '../table-recipes.constants';
import type { Member } from '../table-recipes.types';
import { filterText } from '../table-recipes.utils';

/** Filtering and selection in one table, the way you usually ship it. */
@Component({
  selector: 'demo-filter-selection',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './filter-selection.component.html',
  styleUrl: './filter-selection.component.scss',
})
export class FilterSelection {
  readonly allowMultiple = input(true);
  readonly filterPlaceholder = input('ada, platform, owner');

  readonly columns = ['select', 'name', 'team', 'role'];
  readonly dataSource = new MatTableDataSource(MEMBERS);
  readonly selection = new SelectionModel<Member>(true, []);

  // Re-read after every checkbox change so the header checkbox stays in sync.
  readonly _version = signal(0);

  readonly allSelected = computed(() => {
    this._version();
    return this.selection.selected.length === this.dataSource.data.length;
  });

  readonly someSelected = computed(() => {
    this._version();
    return this.selection.hasValue() && !this.allSelected();
  });

  applyFilter(event: Event): void {
    this.dataSource.filter = filterText(event);
  }

  /** Toggles one row; in single mode it clears the others first. */
  toggleRow(row: Member): void {
    if (!this.allowMultiple()) {
      this.selection.clear();
    }
    this.selection.toggle(row);
    this._version.update((n) => n + 1);
  }

  /** Selects every row, or clears them all when every row is already selected. */
  toggleAll(): void {
    if (this.allSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
    this._version.update((n) => n + 1);
  }
}
