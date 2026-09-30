export const createdMessage = (label: string): string => `New ${label.toLowerCase()}`;

/** The index step places away from i, wrapping around both ends. */
export const wrapIndex = (i: number, step: number, length: number): number =>
  (i + step + length) % length;
