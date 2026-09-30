import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { SoftPlayer } from './soft-player.component';

const meta: Meta = {
  title: 'Beyond Material/Soft Player',
  decorators: [moduleMetadata({ imports: [SoftPlayer] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Press play and the scrubber actually runs. Pick a track from the queue, or
 * toggle shuffle and repeat to see a button stay pressed in.
 */
export const Playground: Story = {
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['light', 'dark', 'blush'],
      description: 'Each tone redefines the background plus its two light colours.',
    },
    height: { control: { type: 'number', min: 560, max: 1000, step: 20 } },
  },
  args: { tone: 'light', height: 720 },
  render: (args) => ({
    props: args,
    template: `<demo-soft-player [tone]="tone" [height]="height" />`,
  }),
};

/** Dark neumorphism, which needs a lighter "light" rather than white. */
export const Dark: Story = {
  render: () => ({ template: `<demo-soft-player tone="dark" [height]="720" />` }),
};

/** Blush: the same two shadows over a warm background. */
export const Blush: Story = {
  render: () => ({ template: `<demo-soft-player tone="blush" [height]="720" />` }),
};
