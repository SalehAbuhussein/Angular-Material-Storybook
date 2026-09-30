import { Component } from '@angular/core';

/** Prints the time it was created, to show when a tab's content is built. */
@Component({
  selector: 'demo-stamp',
  templateUrl: './stamp.component.html',
})
export class Stamp {
  readonly createdAt = new Date().toLocaleTimeString();
}
