import { CdkDrag, CdkDropList, type CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, signal } from '@angular/core';

import { reordered } from '../cdk-drag-drop.utils';
import { STEPS } from './reorder-list.constants';

/** One list, reordered in place with `moveItemInArray`. */
@Component({
  selector: 'demo-reorder-list',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './reorder-list.component.html',
  styleUrl: './reorder-list.component.scss',
})
export class ReorderList implements OnInit {
  readonly steps = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(): void {
    this._initSteps();
  }

  /** Moves the dragged step to where it was dropped. */
  drop(event: CdkDragDrop<string[]>): void {
    this.steps.update((current) => reordered(current, event.previousIndex, event.currentIndex));
  }

  _initSteps(): void {
    this.steps.set([...STEPS]);
  }
}
