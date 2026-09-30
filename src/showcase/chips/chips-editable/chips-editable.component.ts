import { Component, OnInit, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { renamed, withoutItem } from '../chips.utils';
import { STARTING_LABELS } from './chips-editable.constants';

/** Editable chips: double-click or press Enter on a chip to rename it. */
@Component({
  selector: 'docs-chips-editable',
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './chips-editable.component.html',
})
export class ChipsEditable implements OnInit {
  readonly labels = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Fills the set with its sample labels. */
  initComponent(): void {
    this._initLabels();
  }

  rename(from: string, to: string): void {
    this.labels.update((current) => renamed(current, from, to));
  }

  remove(label: string): void {
    this.labels.update((current) => withoutItem(current, label));
  }

  _initLabels(): void {
    this.labels.set([...STARTING_LABELS]);
  }
}
