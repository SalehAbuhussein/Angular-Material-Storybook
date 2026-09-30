import type { ForcedState, Invoice, ScreenState } from './empty-and-error.types';

export const matchingInvoices = (invoices: Invoice[], query: string): Invoice[] => {
  const q = query.trim().toLowerCase();
  if (!q) return invoices;
  return invoices.filter((i) => `${i.client} ${i.id}`.toLowerCase().includes(q));
};

/**
 * The state machine. `no-results` and `empty` are different states on
 * purpose: one is caused by the user, the other is the first-run case.
 */
export const screenState = (
  retrying: boolean,
  forced: ForcedState,
  query: string,
  resultCount: number,
): ScreenState => {
  if (retrying) return 'loading';
  if (forced !== 'auto') {
    // A search that matches nothing still wins, so the demo stays live.
    if (forced === 'ready' && query && resultCount === 0) return 'no-results';
    return forced;
  }
  if (resultCount === 0) return query ? 'no-results' : 'empty';
  return 'ready';
};
