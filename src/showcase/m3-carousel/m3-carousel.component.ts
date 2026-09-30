import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { LAYOUTS, SLIDES, SWIPE_DISTANCE, WHEEL_STEP_MS } from './m3-carousel.constants';
import type { CarouselLayout } from './m3-carousel.types';
import { isHorizontalScroll, nextStart, slideGrow } from './m3-carousel.utils';

/**
 * The M3 carousel. Unlike a classic slider, several items are visible at once
 * in different sizes: one large, one medium, one small. Moving forward shrinks
 * the large one away and grows the next. The small item at the edge tells
 * people there is more to see.
 *
 * Move with the arrow buttons, the arrow keys, a swipe, or a horizontal
 * scroll gesture.
 */
@Component({
  selector: 'm3-carousel',
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './m3-carousel.component.html',
  styleUrl: './m3-carousel.component.scss',
})
export class Carousel {
  readonly layout = input<CarouselLayout>('multi-browse');
  readonly height = input(240);
  readonly label = input('Destinations');

  readonly slides = SLIDES;
  readonly start = signal(0);

  _sizes = computed(() => LAYOUTS[this.layout()]);
  readonly maxStart = computed(() => this.slides.length - this._sizes().length);

  readonly grow = (i: number) => slideGrow(this._sizes(), this.start(), this.maxStart(), i);

  _downX = 0;
  _wheelLock = 0;

  go(step: number): void {
    this.start.update((s) => nextStart(s, step, this.maxStart()));
  }

  dragStart(e: PointerEvent): void {
    this._downX = e.clientX;
  }

  /** Treats a long enough horizontal drag as one step. */
  dragEnd(e: PointerEvent): void {
    const dx = e.clientX - this._downX;
    if (Math.abs(dx) > SWIPE_DISTANCE) this.go(dx < 0 ? 1 : -1);
  }

  /** A trackpad sends many wheel events per gesture; take one step per 400ms. */
  wheel(e: WheelEvent): void {
    if (!isHorizontalScroll(e)) return;
    e.preventDefault();
    const now = Date.now();
    if (now - this._wheelLock < WHEEL_STEP_MS) return;
    this._wheelLock = now;
    this.go(e.deltaX > 0 ? 1 : -1);
  }
}
