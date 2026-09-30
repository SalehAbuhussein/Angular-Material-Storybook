import {
  CdkDrag,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDropList,
  type CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { reordered } from '../cdk-drag-drop.utils';
import { ROWS } from './handles-and-templates.constants';

/**
 * `cdkDragHandle` restricts the grab area, and `cdkDragPreview` and
 * `cdkDragPlaceholder` replace what you see while dragging.
 */
@Component({
  selector: 'demo-handles-and-templates',
  imports: [CdkDropList, CdkDrag, CdkDragHandle, CdkDragPreview, CdkDragPlaceholder, MatIconModule],
  templateUrl: './handles-and-templates.component.html',
  styleUrl: './handles-and-templates.component.scss',
})
export class HandlesAndTemplates implements OnInit {
  readonly rows = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(): void {
    this._initRows();
  }

  /** Moves the dragged row to where it was dropped. */
  drop(event: CdkDragDrop<string[]>): void {
    this.rows.update((current) => reordered(current, event.previousIndex, event.currentIndex));
  }

  _initRows(): void {
    this.rows.set([...ROWS]);
  }
}
