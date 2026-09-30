export const isSelected = (selected: string[], id: string): boolean => selected.includes(id);

/** Adds the id when it is missing, removes it when it is there. */
export const toggleId = (selected: string[], id: string): string[] =>
  selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
