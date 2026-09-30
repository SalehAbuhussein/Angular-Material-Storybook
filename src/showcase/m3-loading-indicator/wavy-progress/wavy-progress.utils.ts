/** A sine wave along y = 8 from x = from to x = to, shifted by phase. */
export function sine(from: number, to: number, phase: number): string {
  if (to - from < 1) return '';
  let d = '';
  for (let x = from; x <= to; x += 2) {
    const y = 8 + Math.sin(x / (40 / (2 * Math.PI)) - phase) * 3;
    d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(2)}`;
  }
  return d;
}

/** The track on either side of the wave, leaving a gap around it. */
export function trackPath(from: number, to: number, width: number, gap: number): string {
  const parts: string[] = [];
  if (from > gap + 2) parts.push(`M2 8L${from - gap} 8`);
  if (to + gap < width - 2) parts.push(`M${to + gap} 8L${width - 2} 8`);
  return parts.join('');
}

export const clampPercent = (value: number): number => Math.max(0, Math.min(100, value));
