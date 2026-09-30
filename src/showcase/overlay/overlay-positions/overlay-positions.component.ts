import { OverlayModule, STANDARD_DROPDOWN_BELOW_POSITIONS } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** Two triggers at opposite edges, both using the same fallback position list. */
@Component({
  selector: 'docs-overlay-positions',
  imports: [OverlayModule, MatButtonModule],
  templateUrl: './overlay-positions.component.html',
  styleUrl: '../overlay-panel.scss',
})
export class OverlayPositions {
  readonly positions = STANDARD_DROPDOWN_BELOW_POSITIONS;
  readonly leftOpen = signal(false);
  readonly rightOpen = signal(false);
}
