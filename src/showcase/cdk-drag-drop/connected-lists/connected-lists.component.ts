import { CdkDrag, CdkDropList, type CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, signal } from '@angular/core';

import { applyDrop } from '../cdk-drag-drop.utils';
import { BACKLOG, SPRINT } from './connected-lists.constants';

/** Two lists joined with `cdkDropListConnectedTo`, moved with `transferArrayItem`. */
@Component({
  selector: 'demo-connected-lists',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './connected-lists.component.html',
  styleUrl: './connected-lists.component.scss',
})
export class ConnectedLists implements OnInit {
  readonly backlog = signal<string[]>([]);
  readonly sprint = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Copies the starting lists, because the drop helpers mutate them in place. */
  initComponent(): void {
    this._initLists();
  }

  /** Reorders within a list or moves the item across, then notifies both signals. */
  drop(event: CdkDragDrop<string[]>): void {
    applyDrop(event);
    this.backlog.update((items) => [...items]);
    this.sprint.update((items) => [...items]);
  }

  _initLists(): void {
    this.backlog.set([...BACKLOG]);
    this.sprint.set([...SPRINT]);
  }
}
