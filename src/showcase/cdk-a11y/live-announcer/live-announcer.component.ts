import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { addedMessage, removedMessage } from './live-announcer.utils';

/** A realistic use: announce the result of an action that changes content silently. */
@Component({
  selector: 'demo-live-announcer',
  imports: [MatButtonModule],
  templateUrl: './live-announcer.component.html',
  styleUrl: './live-announcer.component.scss',
})
export class LiveAnnouncerDemo {
  readonly _announcer = inject(LiveAnnouncer);

  readonly items = signal(0);
  readonly last = signal('nothing yet');

  add(): void {
    this.items.update((n) => n + 1);
    this._say(addedMessage(this.items()));
  }

  remove(): void {
    this.items.update((n) => Math.max(0, n - 1));
    this._say(removedMessage(this.items()));
  }

  _say(message: string): void {
    this._announcer.announce(message, 'polite');
    this.last.set(message);
  }
}
