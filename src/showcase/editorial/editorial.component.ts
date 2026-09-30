import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BODY, DEFAULT_MEASURE, SECTIONS } from './editorial.constants';
import type { Paper } from './editorial.types';
import { scrollPercent } from './editorial.utils';

/**
 * Editorial layout: a serif display face, one measured column, a marginal rail,
 * and paper tones. Angular Material components carry the interactive parts.
 */
@Component({
  selector: 'demo-editorial',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatSliderModule,
    MatProgressBarModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './editorial.component.html',
  styleUrl: './editorial.component.scss',
})
export class Editorial {
  readonly height = input(760);
  readonly paper = input<Paper>('light');

  readonly sections = SECTIONS;
  readonly body = BODY;

  readonly measure = signal(DEFAULT_MEASURE);
  readonly progress = signal(0);

  /** Fills the reading progress bar as the article frame scrolls. */
  onScroll(event: Event): void {
    this.progress.set(scrollPercent(event.target as HTMLElement));
  }
}
