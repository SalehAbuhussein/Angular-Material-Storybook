import type { KanbanColumn } from './kanban.types';

export const COLUMNS: KanbanColumn[] = [
  {
    name: 'To do',
    cards: [
      { title: 'Audit the theme tokens', points: 3 },
      { title: 'Replace the legacy table', points: 8 },
    ],
  },
  {
    name: 'In progress',
    cards: [{ title: 'Signal queries migration', points: 5 }],
  },
  {
    name: 'Done',
    cards: [{ title: 'Zoneless bootstrap', points: 2 }],
  },
];
