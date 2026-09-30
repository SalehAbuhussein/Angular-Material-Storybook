import type { Ticket } from './pagination.types';

const OWNERS = ['Ada', 'Grace', 'Alan', 'Linus', 'Barbara'];

export const TICKETS: Ticket[] = Array.from({ length: 47 }, (_, index) => ({
  id: index + 1,
  title: `Ticket #${index + 1}`,
  owner: OWNERS[index % OWNERS.length],
}));
