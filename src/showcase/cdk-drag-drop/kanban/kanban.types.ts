export interface Card {
  title: string;
  points: number;
}

export interface KanbanColumn {
  name: string;
  cards: Card[];
}
