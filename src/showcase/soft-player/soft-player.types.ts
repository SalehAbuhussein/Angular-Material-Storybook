export type Tone = 'light' | 'dark' | 'blush';

export interface Track {
  title: string;
  artist: string;
  /** Length in seconds. */
  length: number;
}
