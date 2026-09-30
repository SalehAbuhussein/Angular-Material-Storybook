import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Terminal } from './terminal.component';

const meta: Meta = {
  title: 'Beyond Material/Neon Terminal',
  decorators: [moduleMetadata({ imports: [Terminal] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Type a command and press RUN. Try `help`, `status`, `logs`, `deploy` or
 * something invalid. The CONFIG tab turns the scanlines and glow off.
 */
export const Playground: Story = {
  argTypes: {
    phosphor: {
      control: 'inline-radio',
      options: ['green', 'amber', 'ice'],
      description: 'Three CRT tube colours, one custom property each.',
    },
    height: { control: { type: 'number', min: 460, max: 900, step: 20 } },
  },
  args: { phosphor: 'green', height: 620 },
  render: (args) => ({
    props: args,
    template: `<demo-terminal [phosphor]="phosphor" [height]="height" />`,
  }),
};

/** Amber: the other classic tube. */
export const Amber: Story = {
  render: () => ({ template: `<demo-terminal phosphor="amber" [height]="620" />` }),
};

/** Ice: a colder variant that keeps the same contrast relationship. */
export const Ice: Story = {
  render: () => ({ template: `<demo-terminal phosphor="ice" [height]="620" />` }),
};
