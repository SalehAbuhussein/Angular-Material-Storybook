import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { COLUMNS, LINES, PROGRESS, SHIPPING, TIMELINE } from './detail-page.constants';
import type { Status } from './detail-page.types';
import {
  markedMessage,
  nextActionFor,
  nextStatus,
  progressLabelFor,
  subtotalOf,
} from './detail-page.utils';

/**
 * A record detail screen: a header that says what you are looking at and what
 * you can do to it, then a main panel with a metadata rail beside it.
 */
@Component({
  selector: 'demo-detail-page',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    DecimalPipe,
  ],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export class DetailPage {
  _snackBar = inject(MatSnackBar);

  readonly height = input(720);
  readonly initialStatus = input<Status>('Processing');
  /** Put the metadata rail under the main panel instead of beside it. */
  readonly stacked = input(false);

  readonly lines = LINES;
  readonly timeline = TIMELINE;
  readonly cols = COLUMNS;
  readonly shipping = SHIPPING;

  // linkedSignal, not signal: it re-derives whenever the input changes, so the
  // Storybook control keeps working after the first render, and it stays
  // writable, so clicking inside the screen still works too.
  readonly status = linkedSignal<Status>(() => this.initialStatus());

  readonly subtotal = computed(() => subtotalOf(LINES));
  readonly progress = computed(() => PROGRESS[this.status()]);
  readonly progressLabel = computed(() => progressLabelFor(this.progress()));
  readonly nextAction = computed(() => nextActionFor(this.status()));

  /** Moves the order to its next status and says so in a snackbar. */
  advance(): void {
    const next = nextStatus(this.status());
    this.status.set(next);
    this.note(markedMessage(next));
  }

  cancel(): void {
    this.status.set('Cancelled');
    this.note('Order cancelled');
  }

  note(message: string): void {
    this._snackBar.open(message, undefined, { duration: 2200 });
  }
}
