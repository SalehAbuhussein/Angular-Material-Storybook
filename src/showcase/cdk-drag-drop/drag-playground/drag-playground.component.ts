import { CdkDrag, CdkDropList, type CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, computed, input, signal } from '@angular/core';

import { reordered } from '../cdk-drag-drop.utils';
import { FOLDERS } from './drag-playground.constants';
import type { LockAxisOption, Orientation } from './drag-playground.types';
import { toLockAxis } from './drag-playground.utils';

/** Reordering with the orientation and lock axis wired to the controls panel. */
@Component({
  selector: 'demo-drag-playground',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './drag-playground.component.html',
  styleUrl: './drag-playground.component.scss',
})
export class DragPlayground implements OnInit {
  readonly orientation = input<Orientation>('vertical');
  readonly disabled = input(false);
  readonly lockAxis = input<LockAxisOption>('none');

  // A ternary in the template cannot narrow the type of a signal call.
  readonly axis = computed(() => toLockAxis(this.lockAxis()));

  readonly items = signal<string[]>([]);

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(): void {
    this._initItems();
  }

  /** Moves the dragged item to where it was dropped. */
  drop(event: CdkDragDrop<string[]>): void {
    this.items.update((current) => reordered(current, event.previousIndex, event.currentIndex));
  }

  _initItems(): void {
    this.items.set([...FOLDERS]);
  }
}
