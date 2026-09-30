import type { OrderStatus } from './data-table-page.types';

export const NAMES = [
  ['Dana Whitfield', 'dana@northwind.dev'],
  ['Ivo Marek', 'ivo@northwind.dev'],
  ['Lena Osei', 'lena@oseistudio.com'],
  ['Pris Ramos', 'pris@ramos.design'],
  ['Tomas Berg', 'tomas@bergco.se'],
  ['Amara Diallo', 'amara@diallo.io'],
  ['Kenji Sato', 'kenji@sato.jp'],
  ['Marta Kowal', 'marta@kowal.pl'],
];

export const STATUSES: OrderStatus[] = ['Shipped', 'Processing', 'Refunded', 'Cancelled'];

export const COLUMNS = ['select', 'id', 'customer', 'placed', 'total', 'status', 'actions'];

/** A search term that matches no order, used to open on the empty state. */
export const NO_MATCH_QUERY = 'zzzz-no-match';
