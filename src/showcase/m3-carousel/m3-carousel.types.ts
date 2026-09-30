export interface Slide {
  title: string;
  /** Two theme roles mixed into the slide's gradient, so every palette works. */
  from: string;
  to: string;
}

export type CarouselLayout = 'multi-browse' | 'hero' | 'full-screen';
