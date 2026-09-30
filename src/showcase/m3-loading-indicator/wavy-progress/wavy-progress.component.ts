import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import {
  DEFAULT_AMPLITUDE,
  DEFAULT_SPEED,
  DEFAULT_THICKNESS,
  DEFAULT_WAVELENGTH,
  GAP,
  SWEEP_SECONDS,
  VALUE_EASING,
} from './wavy-progress.constants';
import type { Span } from './wavy-progress.types';
import {
  approach,
  barHeight,
  clampPercent,
  prefersReducedMotion,
  sweepSpan,
  trackPath,
  wavePath,
} from './wavy-progress.utils';

/**
 * The M3 wavy progress indicator: a linear bar whose filled part is a rolling
 * wave. Pass `value` from 0 to 100 for determinate progress, or leave it null
 * for an indeterminate one.
 *
 * It is self-contained, so the folder can be copied into any app. It fills
 * the width of its container, and its colours come from two CSS variables that
 * default to Material tokens:
 *
 *   m3-wavy-progress {
 *     --m3-wavy-progress-indicator-color: var(--mat-sys-tertiary);
 *     --m3-wavy-progress-track-color: var(--mat-sys-surface-container-highest);
 *   }
 */
@Component({
  selector: 'm3-wavy-progress',
  templateUrl: './wavy-progress.component.html',
  styleUrl: './wavy-progress.component.scss',
})
export class WavyProgress implements OnInit, OnDestroy {
  readonly value = input<number | null>(null);
  readonly label = input('Loading');
  readonly amplitude = input(DEFAULT_AMPLITUDE);
  readonly wavelength = input(DEFAULT_WAVELENGTH);
  readonly thickness = input(DEFAULT_THICKNESS);
  /** Waves per second that roll along the bar. 0 keeps the wave still. */
  readonly speed = input(DEFAULT_SPEED);
  /** The dot at the end of a determinate bar that marks 100%. */
  readonly showStop = input(true);

  readonly width = signal(0);
  readonly height = computed(() => barHeight(this.amplitude(), this.thickness()));
  readonly centerY = computed(() => this.height() / 2);
  readonly wave = signal('');
  readonly track = signal('');

  _host = inject<ElementRef<HTMLElement>>(ElementRef);
  _injector = inject(Injector);
  _frame = 0;
  _resize?: ResizeObserver;
  /** The filled width drawn right now; it glides toward the value instead of jumping. */
  _shownTo = 0;

  ngOnInit(): void {
    this.initComponent();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this._frame);
    this._resize?.disconnect();
  }

  /** Measures the container, then starts the animation loop. */
  initComponent(): void {
    afterNextRender(
      () => {
        this._initWidth();
        this._initLoop();
      },
      { injector: this._injector },
    );
  }

  /** The bar fills its container, so it tracks the host's width as it resizes. */
  _initWidth(): void {
    const host = this._host.nativeElement;
    this.width.set(host.clientWidth);
    this._resize = new ResizeObserver(() => this.width.set(host.clientWidth));
    this._resize.observe(host);
  }

  /** Rolls the wave and redraws the bar on every animation frame. */
  _initLoop(): void {
    const reduce = prefersReducedMotion();
    const start = performance.now();
    let last = start;
    const tick = (now: number) => {
      // A frame timestamp can be a hair earlier than performance.now() was at start.
      const t = Math.max(0, now - start) / 1000;
      const dt = Math.max(0, now - last) / 1000;
      last = now;
      this._draw(t, dt, reduce);
      this._frame = requestAnimationFrame(tick);
    };
    this._frame = requestAnimationFrame(tick);
  }

  _draw(t: number, dt: number, reduce: boolean): void {
    const span = this._span(t, dt, reduce);
    const phase = reduce ? 0 : t * 2 * Math.PI * this.speed();
    const shape = { amplitude: this.amplitude(), wavelength: this.wavelength(), phase, centerY: this.centerY() };
    const inset = this.thickness() / 2;
    this.wave.set(wavePath(span, shape));
    this.track.set(trackPath(span, this.width(), GAP, this.centerY(), inset));
  }

  /** The part of the bar the wave covers at time `t`. */
  _span(t: number, dt: number, reduce: boolean): Span {
    const w = this.width();
    const v = this.value();
    if (v === null) {
      return reduce ? { from: 0, to: w * 0.4 } : sweepSpan((t / SWEEP_SECONDS) % 1, w);
    }
    const target = (clampPercent(v) / 100) * w;
    this._shownTo = reduce ? target : approach(this._shownTo, target, dt, VALUE_EASING);
    return { from: 0, to: this._shownTo };
  }
}
