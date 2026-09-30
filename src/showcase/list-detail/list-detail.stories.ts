import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ListDetail } from './list-detail.component';

const meta: Meta = {
  title: 'Full Layouts/List and Detail',
  decorators: [moduleMetadata({ imports: [ListDetail] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Pick a message on the left and it opens on the right. Turn on `narrow` to see
 * the same component become two screens with a back button.
 */
export const Playground: Story = {
  argTypes: {
    narrow: {
      control: 'boolean',
      description: 'Single column mode: only one side is in the DOM at a time.',
    },
    initialId: {
      control: 'select',
      options: [null, 1, 2, 3, 4, 5],
      description: 'Which message is open on load. `null` shows the placeholder.',
    },
    height: { control: { type: 'number', min: 420, max: 900, step: 20 } },
  },
  args: { narrow: false, initialId: 1, height: 600 },
  render: (args) => ({
    props: args,
    template: `<demo-list-detail [narrow]="narrow" [initialId]="initialId" [height]="height" />`,
  }),
};

/** Nothing selected: the right pane states that plainly instead of sitting blank. */
export const NothingSelected: Story = {
  render: () => ({ template: `<demo-list-detail [initialId]="null" [height]="600" />` }),
};

/** Phone layout: the list fills the screen until you pick something. */
export const NarrowList: Story = {
  render: () => ({
    template: `<div style="max-width: 420px;"><demo-list-detail [narrow]="true" [initialId]="null" [height]="600" /></div>`,
  }),
};

/** The same narrow layout with a message open, showing the back button. */
export const NarrowDetail: Story = {
  render: () => ({
    template: `<div style="max-width: 420px;"><demo-list-detail [narrow]="true" [initialId]="2" [height]="600" /></div>`,
  }),
};
