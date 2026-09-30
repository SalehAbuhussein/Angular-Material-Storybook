import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Editorial } from './editorial.component';

const meta: Meta = {
  title: 'Beyond Material/Editorial Reader',
  decorators: [moduleMetadata({ imports: [Editorial] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Scroll and watch the hairline progress bar fill. Drag the measure slider in
 * the rail to change the line length of the article live.
 */
export const Playground: Story = {
  argTypes: {
    paper: {
      control: 'inline-radio',
      options: ['light', 'sepia', 'night'],
      description: 'Paper stock. Five custom properties per mode.',
    },
    height: { control: { type: 'number', min: 520, max: 1100, step: 20 } },
  },
  args: { paper: 'light', height: 760 },
  render: (args) => ({
    props: args,
    template: `<demo-editorial [paper]="paper" [height]="height" />`,
  }),
};

/** Sepia: warmer stock, same ink relationship. */
export const Sepia: Story = {
  render: () => ({ template: `<demo-editorial paper="sepia" [height]="760" />` }),
};

/** Night: inverted, with the accent lifted so it still reads against dark paper. */
export const Night: Story = {
  render: () => ({ template: `<demo-editorial paper="night" [height]="760" />` }),
};
