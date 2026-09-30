import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { CheckboxTree } from './checkbox-tree/checkbox-tree.component';
import { FlatTree } from './flat-tree/flat-tree.component';
import { LevelTree } from './level-tree/level-tree.component';
import { NestedTree } from './nested-tree/nested-tree.component';

/**
 * `MatTree` in Angular Material 22 takes a `childrenAccessor` or a
 * `levelAccessor` function. `TreeControl`, `MatTreeFlattener` and
 * `MatTreeFlatDataSource` are deprecated and you no longer need any of them.
 */
const meta: Meta = {
  title: 'Layout/Tree',
  decorators: [
    moduleMetadata({
      imports: [
        MatTreeModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        FlatTree,
        NestedTree,
        LevelTree,
        CheckboxTree,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/**
 * The shape to start from: nested data, `childrenAccessor`, flat rows indented
 * by `matTreeNodePadding`. Expansion is handled entirely by the tree.
 */
export const Playground: Story = {
  argTypes: {
    indent: {
      control: { type: 'number', min: 8, max: 64, step: 4 },
      description: 'Pixels of indent per level, set with `matTreeNodePaddingIndent`.',
    },
  },
  args: { indent: 40 },
  render: (args) => ({
    props: args,
    template: `<docs-flat-tree [indent]="indent" />`,
  }),
};

/**
 * Two node templates, picked by the `when` predicate: one for leaves, one for
 * anything with children.
 */
export const FlatRendering: Story = {
  render: () => ({ template: `<docs-flat-tree />` }),
};

/**
 * `mat-nested-tree-node` renders children inside the parent element through
 * `matTreeNodeOutlet`, which gives you real nested `role="group"` markup.
 */
export const NestedRendering: Story = {
  render: () => ({ template: `<docs-nested-tree />` }),
};

/**
 * `levelAccessor` suits data that arrives flat. The tree renders every row in
 * the array, so the component filters out rows under a collapsed parent.
 */
export const LevelAccessor: Story = {
  render: () => ({ template: `<docs-level-tree />` }),
};

/** Checkboxes that cascade to descendants and roll up to an indeterminate parent. */
export const CheckboxFileTree: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({ template: `<docs-checkbox-tree />` }),
};
