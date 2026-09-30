import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { FILES } from '../tree.constants';
import type { FileNode } from '../tree.types';
import { childrenOf, hasChildren } from '../tree.utils';
import { allSelected, someSelected, sortedNames, withLeaves } from './checkbox-tree.utils';

/** A file tree whose checkboxes cascade down and roll up as indeterminate. */
@Component({
  selector: 'docs-checkbox-tree',
  imports: [MatTreeModule, MatButtonModule, MatCheckboxModule, MatIconModule],
  templateUrl: './checkbox-tree.component.html',
})
export class CheckboxTree {
  readonly data = FILES;
  readonly childrenAccessor = childrenOf;
  readonly hasChild = hasChildren;

  /** Only leaves are stored. Folder state is derived from them. */
  readonly selected = signal(new Set<string>(['app.ts']));
  readonly selectedFiles = computed(() => sortedNames(this.selected()));

  readonly isChecked = (node: FileNode) => allSelected(node, this.selected());
  readonly isPartial = (node: FileNode) => someSelected(node, this.selected());

  select(node: FileNode, checked: boolean) {
    this.selected.set(withLeaves(this.selected(), node, checked));
  }
}
