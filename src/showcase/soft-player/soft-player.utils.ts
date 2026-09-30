/** Formats seconds as m:ss. */
export function mmss(total: number): string {
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** One second on, wrapping back to the start at the end of the track. */
export const tick = (position: number, length: number): number => (position + 1 > length ? 0 : position + 1);

export const nextIndex = (index: number, count: number): number => (index + 1) % count;

export const prevIndex = (index: number, count: number): number => (index - 1 + count) % count;
