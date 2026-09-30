import type { Topic } from './checkbox-group.types';

export const allOn = (topics: Topic[]): boolean => topics.every((t) => t.on);

export const someOn = (topics: Topic[]): boolean => topics.some((t) => t.on) && !allOn(topics);

export const withTopic = (topics: Topic[], id: string, on: boolean): Topic[] =>
  topics.map((t) => (t.id === id ? { ...t, on } : t));

export const withAll = (topics: Topic[], on: boolean): Topic[] => topics.map((t) => ({ ...t, on }));
