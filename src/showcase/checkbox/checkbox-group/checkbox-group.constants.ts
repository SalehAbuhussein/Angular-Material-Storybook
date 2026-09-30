import type { Topic } from './checkbox-group.types';

export const STARTING_TOPICS: Topic[] = [
  { id: 'deploys', label: 'Deploys', on: true },
  { id: 'incidents', label: 'Incidents', on: false },
  { id: 'digest', label: 'Weekly digest', on: false },
];
