import { Component, Injector, OnInit, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QUEUE, START_POSITION, START_VOLUME, TICK_MS } from './soft-player.constants';
import type { Tone } from './soft-player.types';
import { mmss, nextIndex, prevIndex, tick } from './soft-player.utils';

/**
 * Neumorphism: one background colour, two light sources, and every surface
 * either extruded from or pressed into it. The transport controls are
 * matIconButton, the scrubber is mat-slider.
 */
@Component({
  selector: 'demo-soft-player',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatListModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './soft-player.component.html',
  styleUrl: './soft-player.component.scss',
})
export class SoftPlayer implements OnInit {
  readonly height = input(720);
  readonly tone = input<Tone>('light');

  readonly queue = QUEUE;
  readonly index = signal(0);
  readonly playing = signal(false);
  readonly position = signal(START_POSITION);
  readonly volume = signal(START_VOLUME);
  readonly shuffle = signal(false);
  readonly repeat = signal(false);

  readonly current = computed(() => this.queue[this.index()]);

  readonly mmss = mmss;

  _injector = inject(Injector);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Starts the playback clock. */
  initComponent(): void {
    this._initClock();
  }

  toggle(): void {
    this.playing.update((v) => !v);
  }

  /** Jumps to a track in the queue and rewinds it. */
  select(i: number): void {
    this.index.set(i);
    this.position.set(0);
  }

  next(): void {
    this.select(nextIndex(this.index(), this.queue.length));
  }

  prev(): void {
    this.select(prevIndex(this.index(), this.queue.length));
  }

  /**
   * A real clock, so pressing play actually moves the scrubber. The effect's
   * cleanup clears the interval on pause and when the component is destroyed.
   */
  _initClock(): void {
    effect(
      (onCleanup) => {
        if (!this.playing()) return;
        const id = setInterval(() => {
          this.position.update((p) => tick(p, this.current().length));
        }, TICK_MS);
        onCleanup(() => clearInterval(id));
      },
      { injector: this._injector },
    );
  }
}
