export const pageOf = <T>(rows: T[], pageIndex: number, pageSize: number): T[] =>
  rows.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
