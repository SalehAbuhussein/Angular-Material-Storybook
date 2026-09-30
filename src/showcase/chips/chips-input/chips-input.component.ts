import { Component, OnInit, signal } from '@angular/core';
import { MatChipsModule, type MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { withAdded, withoutItem } from '../chips.utils';
import { SEPARATORS, STARTING_TAGS } from './chips-input.constants';

/**
 * Tag entry: a `<mat-chip-grid>` inside a form field, one `<mat-chip-row>` per
 * tag, and an input wired to the grid with `matChipInputFor`.
 */
@Component({
  selector: 'docs-chips-input',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './chips-input.component.html',
  styleUrl: './chips-input.component.scss',
})
export class ChipsInput implements OnInit {
  readonly separators = SEPARATORS;
  readonly tags = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Fills the grid with its sample tags. */
  initComponent(): void {
    this._initTags();
  }

  /** Adds the typed tag unless it is empty or a duplicate, then clears the input. */
  add(event: MatChipInputEvent): void {
    const value = event.value.trim();
    if (value && !this.tags().includes(value)) {
      this.tags.update((current) => withAdded(current, value));
    }
    event.chipInput.clear();
  }

  remove(tag: string): void {
    this.tags.update((current) => withoutItem(current, tag));
  }

  _initTags(): void {
    this.tags.set([...STARTING_TAGS]);
  }
}
