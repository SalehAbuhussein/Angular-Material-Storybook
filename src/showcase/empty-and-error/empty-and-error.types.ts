export type ScreenState = 'loading' | 'error' | 'empty' | 'no-results' | 'ready';

/** `auto` derives the state from the data and the search box. */
export type ForcedState = ScreenState | 'auto';

export interface Invoice {
  id: string;
  client: string;
  amount: string;
  due: string;
}
