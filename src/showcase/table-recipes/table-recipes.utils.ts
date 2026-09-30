/** The typed value of the input that fired the event, trimmed and lower-cased for `dataSource.filter`. */
export const filterText = (event: Event): string =>
  (event.target as HTMLInputElement).value.trim().toLowerCase();
