import type { Tool } from './m3-floating-toolbar.types';

export const TOOLS: Tool[] = [
  { icon: 'edit', label: 'Draw' },
  { icon: 'text_fields', label: 'Text' },
  { icon: 'image', label: 'Image' },
  { icon: 'category', label: 'Shapes' },
];

const TEXTS = [
  'Scroll down to read and the toolbar gets out of the way. Scroll up a little and it is back, ready for the next tool.',
  'A floating toolbar is for screens where the content is the point: a canvas, a document, a photo. It holds the few actions you use most, and nothing else.',
  'Keep it to about five actions. Anything more belongs in a menu from one of them.',
  'The paired FAB is the single most important action, such as a new page. It sits beside the toolbar, not inside it.',
];

/** Enough filler text to make the frame scroll. */
export const PARAGRAPHS = Array.from({ length: 8 }, (_, i) => TEXTS[i % 4]);

/** Scroll changes smaller than this many pixels are ignored, so jitter does not flicker the toolbar. */
export const SCROLL_SLACK = 6;

/** The toolbar only hides once the text has scrolled past this many pixels. */
export const HIDE_AFTER = 40;
