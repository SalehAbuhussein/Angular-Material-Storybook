import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** A live counter, so you can watch the badge appear, change, and hide. */
@Component({
  selector: 'docs-badge-live',
  imports: [MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './badge-live.component.html',
})
export class BadgeLive {
  readonly count = signal(3);
}
