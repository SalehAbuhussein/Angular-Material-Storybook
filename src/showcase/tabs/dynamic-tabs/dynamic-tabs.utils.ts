import type { QueryTab } from './dynamic-tabs.types';

export const queryTab = (id: number): QueryTab => ({ id, label: `Query ${id}` });

export const withoutTab = (tabs: QueryTab[], id: number): QueryTab[] => tabs.filter((tab) => tab.id !== id);
