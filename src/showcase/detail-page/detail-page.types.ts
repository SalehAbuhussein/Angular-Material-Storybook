export type Status = 'Draft' | 'Processing' | 'Shipped' | 'Cancelled';

export interface OrderLine {
  sku: string;
  name: string;
  qty: number;
  price: number;
}

export interface TimelineEvent {
  icon: string;
  title: string;
  /** Rendered with innerHTML, so it can hold entities such as &middot;. */
  meta: string;
}
