export interface ColorOption {
  name: string;
  value: string;
}

export interface Destination {
  icon: string;
  label: string;
}

import type { ShirtPose } from './shirt-art/shirt-art.types';

export interface Shot {
  id: string;
  label: string;
  pose: ShirtPose;
  /** The SVG viewBox that frames the drawing for this shot. */
  view: string;
  /** Fill the frame and crop the edges, for close-ups. */
  crop: boolean;
  alt: string;
}

/** Where a photo sits in the carousel right now. */
export type SlideSize = 'large' | 'medium' | 'small' | 'hidden';

export interface BasketItem {
  size: string;
  color: string;
}
