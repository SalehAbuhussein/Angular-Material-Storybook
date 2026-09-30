export const deleteStatus = (confirmed: boolean | undefined): string =>
  confirmed ? 'Invoice deleted.' : 'Cancelled, nothing deleted.';
