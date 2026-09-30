/** The part of the bar the wave covers, in px from the left edge. */
export interface Span {
  from: number;
  to: number;
}

/** The wave's shape, in px, plus how far it has rolled, in radians. */
export interface WaveShape {
  amplitude: number;
  wavelength: number;
  phase: number;
  centerY: number;
}
