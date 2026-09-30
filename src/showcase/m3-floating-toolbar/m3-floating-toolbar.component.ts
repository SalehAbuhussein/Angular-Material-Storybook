import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HIDE_AFTER, PARAGRAPHS, SCROLL_SLACK, TOOLS } from './m3-floating-toolbar.constants';
import type { ToolbarVariant } from './m3-floating-toolbar.types';

/**
 * The M3 floating toolbar: a pill of actions that floats over the content
 * instead of sitting in a bar, with an optional FAB beside it. It slides away
 * while you scroll down to read and comes back when you scroll up.
 *
 * The toolbar is `role="toolbar"`, and its buttons are real `matIconButton`s
 * with tooltips.
 */
@Component({
  selector: 'm3-floating-toolbar-demo',
  imports: [MatButtonModule, MatIconModule, MatRippleModule, MatTooltipModule],
  templateUrl: './m3-floating-toolbar.component.html',
  styleUrl: './m3-floating-toolbar.component.scss',
})
export class M3FloatingToolbar {
  readonly variant = input<ToolbarVariant>('standard');
  readonly withFab = input(true);
  readonly height = input(480);

  readonly tools = TOOLS;
  readonly paragraphs = PARAGRAPHS;
  readonly tool = signal('Draw');
  readonly hidden = signal(false);

  _lastTop = 0;

  /** Hides the toolbar while scrolling down and shows it again on the way up. */
  onScroll(e: Event): void {
    const top = (e.target as HTMLElement).scrollTop;
    if (Math.abs(top - this._lastTop) < SCROLL_SLACK) return;
    this.hidden.set(top > this._lastTop && top > HIDE_AFTER);
    this._lastTop = top;
  }
}
