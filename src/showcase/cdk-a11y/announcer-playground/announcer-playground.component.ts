import { LiveAnnouncer, type AriaLivePoliteness } from '@angular/cdk/a11y';
import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** Announce a message with the politeness chosen in the controls panel. */
@Component({
  selector: 'demo-announcer-playground',
  imports: [MatButtonModule],
  templateUrl: './announcer-playground.component.html',
  styleUrl: './announcer-playground.component.scss',
})
export class AnnouncerPlayground {
  readonly _announcer = inject(LiveAnnouncer);

  readonly message = input('Report generated');
  readonly politeness = input<AriaLivePoliteness>('polite');

  readonly count = signal(0);

  announce(): void {
    this._announcer.announce(this.message(), this.politeness());
    this.count.update((n) => n + 1);
  }
}
