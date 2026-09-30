import { DecimalPipe, PercentPipe } from '@angular/common';
import { Component, OnDestroy, computed, input, linkedSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ACTIVITY, COLUMNS, KPIS, ORDERS, REFRESH_MS } from './dashboard.constants';
import type { RangeKey } from './dashboard.types';
import { chartLabelFor, scaleKpis, series } from './dashboard.utils';

/**
 * An overview screen: a KPI row, a trend chart, recent activity and a table
 * preview. Everything recalculates when the range changes.
 */
@Component({
  selector: 'demo-dashboard',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDividerModule,
    DecimalPipe,
    PercentPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class Dashboard implements OnDestroy {
  readonly height = input(720);
  readonly initialRange = input<RangeKey>(30);

  // linkedSignal, not signal: it re-derives whenever the input changes, so the
  // Storybook control keeps working after the first render, and it stays
  // writable, so clicking inside the screen still works too.
  readonly range = linkedSignal<RangeKey>(() => this.initialRange());
  readonly loading = signal(false);

  readonly activity = ACTIVITY;
  readonly orders = ORDERS;
  readonly columns = COLUMNS;

  readonly kpis = computed(() => scaleKpis(KPIS, this.range()));
  readonly chart = computed(() => series(this.range(), this.range()));
  readonly chartLabel = computed(() => chartLabelFor(this.range(), this.chart().length));

  _refreshTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this._refreshTimer);
  }

  /** Shows the loading state for a moment, as a stand-in for a real fetch. */
  refresh(): void {
    this.loading.set(true);
    this._refreshTimer = setTimeout(() => this.loading.set(false), REFRESH_MS);
  }
}
