import type { Invoice } from './empty-and-error.types';

export const INVOICES: Invoice[] = [
  { id: '#4821', client: 'Northwind', amount: '$1,542.00', due: 'Due in 6 days' },
  { id: '#4820', client: 'Oseistudio', amount: '$249.00', due: 'Due today' },
  { id: '#4819', client: 'Bergco', amount: '$1,180.00', due: 'Overdue by 2 days' },
  { id: '#4818', client: 'Ramos Design', amount: '$640.00', due: 'Due in 21 days' },
];

export const LAST_SYNC = '09:12 this morning';

/** How long the fake retry shows the loading state. */
export const RETRY_DELAY_MS = 1200;
