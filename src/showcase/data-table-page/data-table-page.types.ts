export type OrderStatus = 'Shipped' | 'Processing' | 'Refunded' | 'Cancelled';

export interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: OrderStatus;
  placed: string;
}

/** The free text and status filters, serialised together into `dataSource.filter`. */
export interface OrderFilter {
  text: string;
  status: string;
}
