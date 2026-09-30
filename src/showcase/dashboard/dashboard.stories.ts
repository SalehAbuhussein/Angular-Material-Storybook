import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Dashboard } from './dashboard.component';

const meta: Meta = {
  title: 'Full Layouts/Dashboard',
  decorators: [moduleMetadata({ imports: [Dashboard] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * The whole screen. Switch the range in the toolbar, or from the control below,
 * and every number, the chart and the labels recalculate.
 */
export const Playground: Story = {
  argTypes: {
    initialRange: {
      control: 'inline-radio',
      options: [7, 30, 90],
      description: 'Reporting window the screen starts on.',
    },
    height: { control: { type: 'number', min: 480, max: 1000, step: 20 } },
  },
  args: { initialRange: 30, height: 720 },
  render: (args) => ({
    props: args,
    template: `<demo-dashboard [initialRange]="initialRange" [height]="height" />`,
  }),
};

/** A short window: fewer chart points and smaller totals. */
export const SevenDays: Story = {
  render: () => ({ template: `<demo-dashboard [initialRange]="7" [height]="720" />` }),
};

/** A long window: the chart packs 90 bars into the same card. */
export const NinetyDays: Story = {
  render: () => ({ template: `<demo-dashboard [initialRange]="90" [height]="720" />` }),
};

/**
 * Narrow the preview below 900px and the three-area grid collapses to one
 * column, with activity moving to the bottom.
 */
export const Narrow: Story = {
  render: () => ({
    template: `<div style="max-width: 720px;"><demo-dashboard [height]="900" /></div>`,
  }),
};
