import type { Package } from '../sorting.types';

/** Turns a size like `4.8 MB` into kilobytes, so it sorts by value. */
export const sizeInKb = (size: string): number => {
  const [value, unit] = size.split(' ');
  return Number(value) * (unit === 'MB' ? 1000 : 1);
};

/** The value `MatTableDataSource` sorts a column by. */
export const sortValue = (row: Package, columnId: string): string | number =>
  columnId === 'size' ? sizeInKb(row.size) : row[columnId as 'name'];
