import type { MatSelectionListChange } from '@angular/material/list';

export const selectedValues = (event: MatSelectionListChange): string[] =>
  event.source.selectedOptions.selected.map((o) => o.value);
