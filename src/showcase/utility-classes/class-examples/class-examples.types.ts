import type { SafeHtml } from '@angular/platform-browser';

/**
 * One real example per class: the class it is about, what to use it for, and
 * the exact markup. The markup is both rendered and printed, so what you read
 * is what you see.
 */
export interface ClassExample {
  cls: string;
  use: string;
  html: string;
}

export interface RenderedExample extends ClassExample {
  safe: SafeHtml;
}
