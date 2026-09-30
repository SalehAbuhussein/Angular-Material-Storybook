import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

import { STARTING_SELECTION, STATUSES } from './chips-listbox.constants';

/** A listbox of chips used as a filter, bound with `ngModel`. */
@Component({
  selector: 'docs-chips-listbox',
  imports: [MatChipsModule, FormsModule],
  templateUrl: './chips-listbox.component.html',
})
export class ChipsListbox implements OnInit {
  readonly statuses = STATUSES;
  readonly selected = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Sets the starting filter selection. */
  initComponent(): void {
    this._initSelection();
  }

  _initSelection(): void {
    this.selected.set([...STARTING_SELECTION]);
  }
}
