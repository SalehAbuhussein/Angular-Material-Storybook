import { Component, OnInit, signal } from '@angular/core';
import { MatListModule, type MatSelectionListChange } from '@angular/material/list';

import { STARTING_SELECTION, TASKS } from './selection-list.constants';
import { selectedValues } from './selection-list.utils';

/** Selection list wired to a signal, so the story can show what is selected. */
@Component({
  selector: 'docs-selection-list',
  imports: [MatListModule],
  templateUrl: './selection-list.component.html',
})
export class SelectionList implements OnInit {
  readonly tasks = TASKS;
  readonly selected = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Sets the starting selection. */
  initComponent(): void {
    this._initSelection();
  }

  onChange(event: MatSelectionListChange): void {
    this.selected.set(selectedValues(event));
  }

  _initSelection(): void {
    this.selected.set([...STARTING_SELECTION]);
  }
}
