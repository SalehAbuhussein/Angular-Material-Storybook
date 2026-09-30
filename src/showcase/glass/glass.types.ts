export interface Node {
  name: string;
  region: string;
  load: number;
  state: 'healthy' | 'warm' | 'hot';
}

export type Mood = 'dusk' | 'reef' | 'ember';
