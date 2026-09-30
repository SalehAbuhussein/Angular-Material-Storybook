import { OverlayModule } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** The minimum viable connected overlay: an origin, a template, and a boolean. */
@Component({
  selector: 'docs-overlay-popover',
  imports: [OverlayModule, MatButtonModule, MatIconModule],
  templateUrl: './overlay-popover.component.html',
  styleUrl: '../overlay-panel.scss',
})
export class OverlayPopover {
  readonly isOpen = signal(false);

  /** Closes the popover on Escape, which the directive leaves to you. */
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isOpen.set(false);
    }
  }
}
