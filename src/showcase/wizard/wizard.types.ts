export type Orientation = 'horizontal' | 'vertical';

export interface Plan {
  id: string;
  name: string;
  /** Monthly price in dollars. 0 is shown as "Free". */
  price: number;
  blurb: string;
}
