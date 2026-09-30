/** A long multi-line report, big enough that a single copy attempt can fail. */
export const buildReport = (lines: number): string =>
  Array.from({ length: lines }, (_, index) => `row ${index + 1}: all systems nominal`).join('\n');
