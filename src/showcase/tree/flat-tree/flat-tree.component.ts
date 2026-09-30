import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { FILES } from '../tree.constants';
import { childrenOf, hasChildren } from '../tree.utils';

/** Nested data rendered as a flat list of rows, indented with `matTreeNodePadding`. */
@Component({
  selector: 'docs-flat-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './flat-tree.component.html',
  styleUrl: './flat-tree.component.scss',
})
export class FlatTree {
  /** Pixels of indent per level, passed to `matTreeNodePaddingIndent`. */
  readonly indent = input(40);
  readonly data = FILES;
  readonly childrenAccessor = childrenOf;
  readonly hasChild = hasChildren;
}
