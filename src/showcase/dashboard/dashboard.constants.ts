import type { ActivityItem, Kpi, OrderPreview } from './dashboard.types';

export const KPIS: Kpi[] = [
  { id: 'revenue', label: 'Revenue', icon: 'payments', base: 128_400, prefix: '$', delta: 0.124 },
  { id: 'orders', label: 'Orders', icon: 'receipt_long', base: 2_318, delta: 0.061 },
  { id: 'customers', label: 'New customers', icon: 'group_add', base: 412, delta: -0.028 },
  { id: 'refunds', label: 'Refund rate', icon: 'undo', base: 2.4, suffix: '%', delta: -0.006 },
];

export const ACTIVITY: ActivityItem[] = [
  { icon: 'shopping_bag', title: 'Order #4821 shipped', meta: 'Dana Whitfield', ago: '4 minutes ago' },
  { icon: 'person_add', title: 'New customer signed up', meta: 'ivo@northwind.dev', ago: '22 minutes ago' },
  { icon: 'undo', title: 'Refund issued', meta: '$89.00 on order #4788', ago: '1 hour ago' },
  { icon: 'inventory_2', title: 'Low stock warning', meta: 'Aeron chair, 3 left', ago: '2 hours ago' },
  { icon: 'reviews', title: 'Review left', meta: '5 stars on Night Drive LP', ago: '3 hours ago' },
];

export const ORDERS: OrderPreview[] = [
  { id: '#4821', customer: 'Dana Whitfield', total: 1395, status: 'Shipped' },
  { id: '#4820', customer: 'Ivo Marek', total: 249, status: 'Processing' },
  { id: '#4819', customer: 'Lena Osei', total: 89, status: 'Refunded' },
  { id: '#4818', customer: 'Pris Ramos', total: 640, status: 'Shipped' },
  { id: '#4817', customer: 'Tomas Berg', total: 1_180, status: 'Processing' },
];

export const COLUMNS = ['id', 'customer', 'total', 'status'];

/** How long the fake refresh keeps the progress bar up. */
export const REFRESH_MS = 900;
