/** Case-insensitive substring match; a null query matches everything. */
export const statesMatching = (states: string[], query: string | null): string[] => {
  const q = (query ?? '').toLowerCase();
  return states.filter((state) => state.toLowerCase().includes(q));
};
