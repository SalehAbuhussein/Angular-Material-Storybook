import { NAMES, STATUSES } from './data-table-page.constants';
import type { Order, OrderFilter } from './data-table-page.types';

/** Builds `count` sample orders, newest first. */
export function makeOrders(count: number): Order[] {
  return Array.from({ length: count }, (_, i) => {
    const [customer, email] = NAMES[i % NAMES.length];
    return {
      id: `#${4821 - i}`,
      customer,
      email,
      total: Math.round((80 + ((i * 137) % 1400)) * 100) / 100,
      status: STATUSES[(i * 3) % STATUSES.length],
      placed: new Date(2026, 8, 19 - (i % 28)).toISOString().slice(0, 10),
    };
  });
}

export const filterKey = (query: string, status: string): string =>
  JSON.stringify({ text: query.trim().toLowerCase(), status } satisfies OrderFilter);

/** One predicate covering the free text box and the status select. */
export function matchesFilter(row: Order, filter: string): boolean {
  const { text, status } = JSON.parse(filter) as OrderFilter;
  const haystack = `${row.id} ${row.customer} ${row.email}`.toLowerCase();
  return haystack.includes(text) && (!status || row.status === status);
}

export const bulkMessage = (message: string, count: number): string => `${message} (${count})`;
