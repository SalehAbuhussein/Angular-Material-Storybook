import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MESSAGES } from './list-detail.constants';
import { filterMessages, findMessage } from './list-detail.utils';

/**
 * The inbox pattern: a list you pick from on the left, the selected record on
 * the right. On a narrow screen it becomes two views with a back button.
 */
@Component({
  selector: 'demo-list-detail',
  imports: [
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.scss',
})
export class ListDetail {
  readonly height = input(600);
  /** Render as a single column with a back button, as on a phone. */
  readonly narrow = input(false);
  readonly initialId = input<number | null>(1);

  // linkedSignal, not signal: it re-derives whenever the input changes, so the
  // Storybook control keeps working after the first render, and it stays
  // writable, so clicking inside the screen still works too.
  readonly selectedId = linkedSignal<number | null>(() => this.initialId());
  readonly query = signal('');
  draft = '';

  readonly filtered = computed(() => filterMessages(MESSAGES, this.query()));
  readonly selected = computed(() => findMessage(MESSAGES, this.selectedId()));

  /** Opens a message and throws away any half-written reply to the previous one. */
  pick(id: number): void {
    this.selectedId.set(id);
    this.draft = '';
  }

  back(): void {
    this.selectedId.set(null);
  }

  send(): void {
    this.draft = '';
  }
}
