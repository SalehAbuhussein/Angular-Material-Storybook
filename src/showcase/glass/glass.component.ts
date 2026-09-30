import { DecimalPipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NODES } from './glass.constants';
import type { Mood } from './glass.types';
import {
  areaPathOf,
  cacheHitRate,
  countOn,
  linePathOf,
  sparkPoints,
  throughputOf,
  wave,
} from './glass.utils';

/**
 * Glassmorphism: a saturated aurora behind frosted panels, hairline luminous
 * borders, and long soft shadows. Built from mat-card, mat-slider, mat-list and
 * friends.
 */
@Component({
  selector: 'demo-glass',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule,
    FormsModule,
    DecimalPipe,
  ],
  templateUrl: './glass.component.html',
  styleUrl: './glass.component.scss',
})
export class Glass {
  readonly height = input(760);
  readonly mood = input<Mood>('dusk');

  readonly nodes = NODES;
  readonly region = signal('Global');
  readonly points = signal(28);
  readonly autoscale = signal(true);
  readonly shield = signal(true);
  readonly beta = signal(false);

  readonly series = computed(() => wave(this.points(), this.region().length));
  readonly throughput = computed(() => throughputOf(this.series()));
  readonly hitRate = computed(() => cacheHitRate(this.autoscale(), this.shield()));
  readonly activeCount = computed(() => countOn([this.autoscale(), this.shield(), this.beta()]));

  readonly linePath = computed(() => linePathOf(sparkPoints(this.series())));
  readonly areaPath = computed(() => areaPathOf(sparkPoints(this.series())));
}
