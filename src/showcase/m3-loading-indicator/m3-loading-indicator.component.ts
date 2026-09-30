import { Component, Injector, OnDestroy, OnInit, afterNextRender, inject, input, signal } from '@angular/core';

import { HOLD_MS, SHAPES } from './m3-loading-indicator.constants';
import { blend, prefersReducedMotion, radii, spring, toPath } from './m3-loading-indicator.utils';

/**
 * The M3 loading indicator: a shape that morphs through seven forms while it
 * spins. It is for waits under about five seconds, where a progress bar would
 * be overkill. Use `contained` on busy backgrounds, such as over an image.
 */
@Component({
  selector: 'm3-loading-indicator',
  templateUrl: './m3-loading-indicator.component.html',
  styleUrl: './m3-loading-indicator.component.scss',
})
export class LoadingIndicator implements OnInit, OnDestroy {
  readonly size = input(48);
  readonly contained = input(false);
  readonly label = input('Loading');

  _injector = inject(Injector);
  _shapeRadii = SHAPES.map(radii);
  _frame = 0;

  readonly path = signal(toPath(this._shapeRadii[0], 34, 50));
  readonly angle = signal(0);

  ngOnInit(): void {
    this.initComponent();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this._frame);
  }

  /** Starts the morph loop once the indicator is on screen. */
  initComponent(): void {
    this._initAnimation();
  }

  _initAnimation(): void {
    afterNextRender(() => this._startLoop(), { injector: this._injector });
  }

  /** Redraws the shape and its rotation on every animation frame. */
  _startLoop(): void {
    const reduce = prefersReducedMotion();
    const start = performance.now();
    const tick = (now: number) => {
      // A frame timestamp can be a hair earlier than performance.now() was at start.
      const t = Math.max(0, now - start);
      const step = Math.floor(t / HOLD_MS);
      const local = Math.min(1, (t % HOLD_MS) / (HOLD_MS * 0.8));
      const from = this._shapeRadii[reduce ? 0 : step % SHAPES.length];
      const to = this._shapeRadii[(step + 1) % SHAPES.length];
      const e = reduce ? 0 : spring(local);
      // The contained form draws a little smaller so it sits inside its circle.
      const scale = this.contained() ? 26 : 34;
      this.path.set(toPath(blend(from, to, e), scale, 50));
      // Spins steadily, plus an extra kick during each morph.
      this.angle.set(reduce ? (t / 40) % 360 : ((t / 6) + (step + e) * 90) % 360);
      this._frame = requestAnimationFrame(tick);
    };
    this._frame = requestAnimationFrame(tick);
  }
}
