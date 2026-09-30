import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/** Action list whose items run a handler instead of navigating. */
@Component({
  selector: 'docs-action-list',
  imports: [MatListModule, MatIconModule],
  templateUrl: './action-list.component.html',
})
export class ActionList {
  readonly last = signal('');

  run(what: string): void {
    this.last.set(what);
  }
}
