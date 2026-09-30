import type { OrderLine, Status, TimelineEvent } from './detail-page.types';

export const LINES: OrderLine[] = [
  { sku: 'AER-B-GRA', name: 'Aeron chair, size B', qty: 1, price: 1395 },
  { sku: 'DSK-MAT-XL', name: 'Desk mat, XL felt', qty: 2, price: 45 },
  { sku: 'CBL-USB-C2', name: 'USB-C cable, 2m', qty: 3, price: 19 },
];

export const TIMELINE: TimelineEvent[] = [
  { icon: 'local_shipping', title: 'Shipped', meta: 'Tracking 1Z999AA1 &middot; 19 Sep, 09:12' },
  { icon: 'inventory', title: 'Packed', meta: 'Warehouse 3 &middot; 18 Sep, 16:40' },
  { icon: 'payments', title: 'Payment captured', meta: '$1,542.00 &middot; 18 Sep, 11:02' },
  { icon: 'add_shopping_cart', title: 'Order placed', meta: 'Web checkout &middot; 18 Sep, 10:58' },
];

export const COLUMNS = ['name', 'qty', 'price', 'total'];

export const SHIPPING = 62;

/** How far along fulfilment each status is, as a percentage. */
export const PROGRESS: Record<Status, number> = {
  Draft: 10,
  Processing: 55,
  Shipped: 100,
  Cancelled: 0,
};
