import { Component, OnDestroy, computed, input, signal, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { INVOICES, LAST_SYNC, RETRY_DELAY_MS } from './empty-and-error.constants';
import type { ForcedState, ScreenState } from './empty-and-error.types';
import { matchingInvoices, screenState } from './empty-and-error.utils';

/**
 * One screen, five states. Every list view needs all of them, and the usual bug
 * is shipping only the happy one.
 */
@Component({
  selector: 'demo-states',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    FormsModule,
  ],
  templateUrl: './empty-and-error.component.html',
  styleUrl: './empty-and-error.component.scss',
})
export class EmptyAndError implements OnDestroy {
  readonly height = input(560);
  readonly forceState = input<ForcedState>('auto');
  readonly offlineBanner = input(false);
  /** Seeds the search box, so the no-results state can name a real term. */
  readonly initialQuery = input('');

  // linkedSignal, not signal: it re-derives whenever the input changes, so the
  // Storybook control keeps working after the first render, and it stays
  // writable, so clicking inside the screen still works too.
  readonly query = linkedSignal(() => this.initialQuery());
  readonly retrying = signal(false);
  readonly offlineOverride = signal<boolean | null>(null);

  readonly lastSync = LAST_SYNC;

  readonly offline = computed(() => this.offlineOverride() ?? this.offlineBanner());
  readonly results = computed(() => matchingInvoices(INVOICES, this.query()));
  readonly state = computed<ScreenState>(() =>
    screenState(this.retrying(), this.forceState(), this.query(), this.results().length),
  );

  _retryTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this._retryTimer);
  }

  /** Shows the loading state for a moment, as if the request were sent again. */
  retry(): void {
    this.retrying.set(true);
    this._retryTimer = setTimeout(() => this.retrying.set(false), RETRY_DELAY_MS);
  }
}
