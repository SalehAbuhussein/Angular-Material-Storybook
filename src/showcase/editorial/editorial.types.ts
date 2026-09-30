export type Paper = 'light' | 'sepia' | 'night';

export interface Section {
  id: string;
  label: string;
}

export interface BodyBlock {
  id: string;
  heading: string;
  /** The first paragraph of a lead block gets the drop cap. */
  lead?: boolean;
  paras: string[];
}
