import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { FILES } from '../tree.constants';
import { childrenOf, hasChildren } from '../tree.utils';

/** The same data rendered as nested DOM, so each group is a real `role="group"`. */
@Component({
  selector: 'docs-nested-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './nested-tree.component.html',
  styleUrl: './nested-tree.component.scss',
})
export class NestedTree {
  readonly data = FILES;
  readonly childrenAccessor = childrenOf;
  readonly hasChild = hasChildren;
}
