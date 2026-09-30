import type { Sort } from '@angular/material/sort';

import type { Package } from '../sorting.types';

export const sortLabel = (sort: Sort): string =>
  `${sort.active || 'none'} ${sort.direction || '(cleared)'}`;

/** A sorted copy of the rows, or the rows as given when the sort is cleared. */
export function sortPackages(rows: Package[], sort: Sort): Package[] {
  if (!sort.active || sort.direction === '') {
    return rows;
  }

  const factor = sort.direction === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const left = a[sort.active as keyof Package];
    const right = b[sort.active as keyof Package];
    return left < right ? -factor : left > right ? factor : 0;
  });
}
