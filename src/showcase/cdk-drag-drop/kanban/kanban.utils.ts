import type { KanbanColumn } from './kanban.types';

/** New column and card arrays, so a signal holding them notifies. */
export const copyColumns = (columns: KanbanColumn[]): KanbanColumn[] =>
  columns.map((column) => ({ ...column, cards: [...column.cards] }));
