import { OverlayModule } from '@angular/cdk/overlay';
import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { POSITIONS } from './overlay-playground.constants';
import { positionsFor } from './overlay-playground.utils';

/**
 * The playground dropdown. The overlay lives in an `<ng-template>` and is only
 * created when `cdkConnectedOverlayOpen` turns true.
 */
@Component({
  selector: 'docs-overlay-playground',
  imports: [OverlayModule, MatButtonModule, MatListModule],
  templateUrl: './overlay-playground.component.html',
  styleUrl: '../overlay-panel.scss',
})
export class OverlayPlayground {
  readonly position = input<keyof typeof POSITIONS | string>('below');
  readonly hasBackdrop = input(true);
  readonly width = input<number | string>(220);

  readonly isOpen = signal(false);

  readonly positionList = () => positionsFor(this.position());
}
