let artCount = 0;

/** A unique id prefix, so every drawing on the page gets its own SVG pattern. */
export const nextArtId = (): string => `shirt-${++artCount}-`;

export const fabricBase = (color: string): string => `color-mix(in srgb, ${color} 42%, #fff)`;

export const fabricStripe = (color: string): string => `color-mix(in srgb, ${color} 70%, #000)`;

export const collarShade = (color: string): string => `color-mix(in srgb, ${color} 55%, #bbb)`;
