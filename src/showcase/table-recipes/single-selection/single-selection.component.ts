import { SelectionModel } from '@angular/cdk/collections';
import { Component, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { MEMBERS } from '../table-recipes.constants';
import type { Member } from '../table-recipes.types';

/** Selection with no header checkbox: one row at a time. */
@Component({
  selector: 'demo-single-selection',
  imports: [MatTableModule, MatCheckboxModule],
  templateUrl: './single-selection.component.html',
  styleUrl: './single-selection.component.scss',
})
export class SingleSelectionDemo {
  readonly columns = ['select', 'name', 'team'];
  readonly data = MEMBERS;
  readonly selection = new SelectionModel<Member>(false, []);
  readonly selectedId = signal<number | null>(null);

  select(row: Member): void {
    this.selection.toggle(row);
    this.selectedId.set(this.selection.selected[0]?.id ?? null);
  }
}
