export interface ColorOption {
  name: string;
  value: string;
}

export interface Destination {
  icon: string;
  label: string;
}

export type ShotKind = 'full' | 'collar' | 'detail';

export interface Shot {
  kind: ShotKind;
  /** The SVG viewBox that crops the blouse drawing for this shot. */
  view: string;
  alt: string;
}

export interface BasketItem {
  size: string;
  color: string;
}
