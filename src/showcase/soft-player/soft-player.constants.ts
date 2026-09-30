import type { Track } from './soft-player.types';

export const QUEUE: Track[] = [
  { title: 'Night Drive', artist: 'The Midnight', length: 254 },
  { title: 'Slow Burn', artist: 'Kavinsky', length: 218 },
  { title: 'Paper Lanterns', artist: 'Hiroshi Sato', length: 301 },
  { title: 'Static Bloom', artist: 'Com Truise', length: 196 },
];

export const START_POSITION = 42;
export const START_VOLUME = 64;
export const TICK_MS = 1000;
