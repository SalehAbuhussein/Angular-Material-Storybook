/** The flex-grow of slide i, or 0 when it is outside the visible window. */
export const slideGrow = (sizes: number[], start: number, maxStart: number, i: number): number =>
  sizes[i - Math.min(start, maxStart)] ?? 0;

/** Moves the first visible slide by step, kept between 0 and maxStart. */
export const nextStart = (start: number, step: number, maxStart: number): number =>
  Math.max(0, Math.min(maxStart, Math.min(start, maxStart) + step));

/** True when the wheel event is a deliberate horizontal scroll. */
export const isHorizontalScroll = (e: WheelEvent): boolean =>
  Math.abs(e.deltaX) >= Math.abs(e.deltaY) && Math.abs(e.deltaX) >= 10;
