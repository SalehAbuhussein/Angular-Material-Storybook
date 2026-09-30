import type { OrderLine, Status } from './detail-page.types';

export const subtotalOf = (lines: OrderLine[]): number =>
  lines.reduce((sum, l) => sum + l.qty * l.price, 0);

export const progressLabelFor = (progress: number): string => `Fulfilment ${progress}% complete`;

export const nextActionFor = (status: Status): string =>
  status === 'Shipped' ? 'Mark delivered' : 'Mark shipped';

/** The primary action toggles an order between processing and shipped. */
export const nextStatus = (status: Status): Status => (status === 'Shipped' ? 'Processing' : 'Shipped');

export const markedMessage = (status: Status): string => `Order marked ${status.toLowerCase()}`;
