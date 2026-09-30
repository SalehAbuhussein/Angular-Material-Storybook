import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { FLAT_NODES } from './level-tree.constants';
import type { FlatNode } from './level-tree.types';
import { levelOf, toggledIn, visibleRows } from './level-tree.utils';

/**
 * `levelAccessor` with data that is already flat. The component owns the
 * expansion state because the tree renders every row it is given.
 */
@Component({
  selector: 'docs-level-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './level-tree.component.html',
})
export class LevelTree {
  readonly levelAccessor = levelOf;
  readonly expanded = signal(new Set<string>(['src']));
  readonly visible = computed(() => visibleRows(FLAT_NODES, this.expanded()));

  toggle(node: FlatNode) {
    this.expanded.set(toggledIn(this.expanded(), node.id));
  }
}
