import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Glass } from './glass.component';

const meta: Meta = {
  title: 'Beyond Material/Glass Dashboard',
  decorators: [moduleMetadata({ imports: [Glass] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Drag the detail slider to redraw the sparkline, flip the switches to move the
 * cache ring, or change the mood to repaint the aurora.
 */
export const Playground: Story = {
  argTypes: {
    mood: {
      control: 'inline-radio',
      options: ['dusk', 'reef', 'ember'],
      description: 'Three custom properties drive the aurora and every accent.',
    },
    height: { control: { type: 'number', min: 560, max: 1100, step: 20 } },
  },
  args: { mood: 'dusk', height: 760 },
  render: (args) => ({
    props: args,
    template: `<demo-glass [mood]="mood" [height]="height" />`,
  }),
};

/** Reef: greens and blues behind the same frosted panels. */
export const Reef: Story = {
  render: () => ({ template: `<demo-glass mood="reef" [height]="760" />` }),
};

/** Ember: warm aurora, identical layout and identical components. */
export const Ember: Story = {
  render: () => ({ template: `<demo-glass mood="ember" [height]="760" />` }),
};
