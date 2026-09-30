import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/** Drives a determinate bar from a signal and reports when the fill animation lands. */
@Component({
  selector: 'docs-progress-bar-live',
  imports: [MatProgressBarModule, MatButtonModule],
  templateUrl: './progress-bar-live.component.html',
})
export class ProgressBarLive {
  readonly Math = Math;
  readonly value = signal(40);
  readonly settled = signal(40);
}
