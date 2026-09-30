import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { DetailPage } from './detail-page.component';

const meta: Meta = {
  title: 'Full Layouts/Detail Page',
  decorators: [moduleMetadata({ imports: [DetailPage] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Switch tabs, use the primary action to move the order forward, or cancel it
 * from the overflow menu. The status chip and the progress bar both follow.
 */
export const Playground: Story = {
  argTypes: {
    initialStatus: {
      control: 'inline-radio',
      options: ['Draft', 'Processing', 'Shipped', 'Cancelled'],
      description: 'Drives the chip, the progress bar and the primary action label.',
    },
    stacked: { control: 'boolean', description: 'Move the metadata rail below the main panel.' },
    height: { control: { type: 'number', min: 520, max: 1000, step: 20 } },
  },
  args: { initialStatus: 'Processing', stacked: false, height: 720 },
  render: (args) => ({
    props: args,
    template: `<demo-detail-page
      [initialStatus]="initialStatus" [stacked]="stacked" [height]="height" />`,
  }),
};

/** A finished order: the progress bar is full and the action moves on. */
export const Shipped: Story = {
  render: () => ({ template: `<demo-detail-page initialStatus="Shipped" [height]="720" />` }),
};

/** A cancelled order: the primary action is disabled rather than hidden. */
export const Cancelled: Story = {
  render: () => ({ template: `<demo-detail-page initialStatus="Cancelled" [height]="720" />` }),
};

/** Narrow: the rail drops under the main panel and the header wraps. */
export const Stacked: Story = {
  render: () => ({
    template: `<div style="max-width: 640px;"><demo-detail-page [stacked]="true" [height]="900" /></div>`,
  }),
};
