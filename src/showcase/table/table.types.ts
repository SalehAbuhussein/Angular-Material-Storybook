/** One row of the demo data. */
export interface Release {
  version: string;
  name: string;
  released: string;
  status: 'active' | 'lts' | 'end of life';
  notes: string;
}
