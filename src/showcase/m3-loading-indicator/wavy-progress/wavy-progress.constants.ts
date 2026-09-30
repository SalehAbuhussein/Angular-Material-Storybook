// Defaults for the inputs, taken from the M3 wavy progress indicator.

/** Height of the wave above and below the centre line, in px. */
export const DEFAULT_AMPLITUDE = 3;

/** Length of one full wave, in px. */
export const DEFAULT_WAVELENGTH = 40;

/** Stroke width of the wave and the track, in px. */
export const DEFAULT_THICKNESS = 4;

/** Waves per second that roll along the bar. */
export const DEFAULT_SPEED = 0.8;

/** The wave flattens to a line over this many px at each end, so its tips never bob. */
export const TAPER = 18;

/** Space between the wave and the flat track, in px. */
export const GAP = 6;

/** One indeterminate sweep, head then tail, in seconds. */
export const SWEEP_SECONDS = 1.8;

/** How quickly the bar glides to a new value; higher is faster. */
export const VALUE_EASING = 8;
