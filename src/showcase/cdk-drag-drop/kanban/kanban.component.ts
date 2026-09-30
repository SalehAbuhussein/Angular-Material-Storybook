import {
  CdkDrag,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  type CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { applyDrop } from '../cdk-drag-drop.utils';
import { COLUMNS } from './kanban.constants';
import type { Card, KanbanColumn } from './kanban.types';
import { copyColumns } from './kanban.utils';

/** A kanban board: `cdkDropListGroup` connects every column without naming ids. */
@Component({
  selector: 'demo-kanban',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, CdkDragHandle, MatIconModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class Kanban implements OnInit {
  readonly columns = signal<KanbanColumn[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Copies the starting board, because the drop helpers mutate the card arrays in place. */
  initComponent(): void {
    this._initColumns();
  }

  /** Reorders within a column or moves the card across, then notifies the signal. */
  drop(event: CdkDragDrop<Card[]>): void {
    applyDrop(event);
    this.columns.update(copyColumns);
  }

  _initColumns(): void {
    this.columns.set(copyColumns(COLUMNS));
  }
}
