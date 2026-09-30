import { Component, Injector, OnDestroy, OnInit, afterNextRender, inject, input, signal } from '@angular/core';

import { prefersReducedMotion } from '../m3-loading-indicator.utils';
import { clampPercent, sine, trackPath } from './wavy-progress.utils';

/**
 * The M3 wavy progress indicator: a linear bar whose filled part is a moving
 * wave. Pass `value` from 0 to 100 for determinate progress, or leave it null
 * for an indeterminate one.
 */
@Component({
  selector: 'm3-wavy-progress',
  templateUrl: './wavy-progress.component.html',
  styleUrl: './wavy-progress.component.scss',
})
export class WavyProgress implements OnInit, OnDestroy {
  readonly value = input<number | null>(null);
  readonly width = input(320);
  readonly label = input('Uploading');

  readonly wave = signal('');
  readonly track = signal('');

  _injector = inject(Injector);
  _frame = 0;

  ngOnInit(): void {
    this.initComponent();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this._frame);
  }

  /** Starts the wave loop once the bar is on screen. */
  initComponent(): void {
    this._initAnimation();
  }

  _initAnimation(): void {
    afterNextRender(() => this._startLoop(), { injector: this._injector });
  }

  /** Moves the wave and redraws the track around it on every animation frame. */
  _startLoop(): void {
    const reduce = prefersReducedMotion();
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.max(0, now - start) / 1000;
      const w = this.width();
      const phase = reduce ? 0 : t * 2 * Math.PI * 0.8;
      let from = 0;
      let to: number;
      const v = this.value();
      if (v === null) {
        // A segment that sweeps across and wraps around.
        const p = (t * 0.6) % 1.4;
        from = Math.max(0, (p - 0.4) * w);
        to = Math.min(w, p * w);
      } else {
        to = (clampPercent(v) / 100) * w;
      }
      this.wave.set(sine(from, to, phase));
      this.track.set(trackPath(from, to, w, 6));
      this._frame = requestAnimationFrame(tick);
    };
    this._frame = requestAnimationFrame(tick);
  }
}
