import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ConnectedLists } from './connected-lists/connected-lists.component';
import { DragPlayground } from './drag-playground/drag-playground.component';
import { HandlesAndTemplates } from './handles-and-templates/handles-and-templates.component';
import { Kanban } from './kanban/kanban.component';
import { ReorderList } from './reorder-list/reorder-list.component';

/**
 * `@angular/cdk/drag-drop` is behaviour without styling. `cdkDrag` makes an
 * element draggable, `cdkDropList` makes a container sortable, and you update
 * your own arrays in the drop handler.
 */
const meta: Meta = {
  title: 'CDK/Drag and Drop',
  decorators: [
    moduleMetadata({
      imports: [
        DragPlayground,
        ReorderList,
        ConnectedLists,
        HandlesAndTemplates,
        Kanban,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Switch the list to horizontal, lock an axis, or disable dragging entirely. */
export const Playground: Story = {
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: '`cdkDropListOrientation`, which sorting direction the list uses.',
    },
    lockAxis: {
      control: 'inline-radio',
      options: ['none', 'x', 'y'],
      description: '`cdkDragLockAxis`, restricts movement to one axis.',
    },
    disabled: { control: 'boolean', description: '`cdkDropListDisabled`.' },
  },
  args: { orientation: 'vertical', lockAxis: 'none', disabled: false },
  render: (args) => ({
    props: args,
    template: `<demo-drag-playground
      [orientation]="orientation"
      [lockAxis]="lockAxis"
      [disabled]="disabled" />`,
  }),
};

/** The smallest useful case: one list, `moveItemInArray` in the drop handler. */
export const ReorderAList: Story = {
  render: () => ({ template: `<demo-reorder-list />` }),
};

/** `cdkDropListConnectedTo` names the lists an item may be dropped into. */
export const TransferBetweenLists: Story = {
  render: () => ({ template: `<demo-connected-lists />` }),
};

/** A handle keeps the rest of the row interactive. Preview and placeholder are templates. */
export const HandlesPreviewAndPlaceholder: Story = {
  render: () => ({ template: `<demo-handles-and-templates />` }),
};

/** Three connected columns through `cdkDropListGroup`, no ids to keep in sync. */
export const KanbanBoard: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({ template: `<demo-kanban />` }),
};
