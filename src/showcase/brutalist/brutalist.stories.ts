import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Brutalist } from './brutalist.component';

const meta: Meta = {
  title: 'Beyond Material/Neo Brutalist Console',
  decorators: [moduleMetadata({ imports: [Brutalist] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Filter, switch scope, kill a row, hit DEPLOY. Every control is a stock
 * Angular Material component with its tokens overridden.
 */
export const Playground: Story = {
  argTypes: {
    accent: {
      control: 'inline-radio',
      options: ['acid', 'hot', 'sky'],
      description: 'Two custom properties change the entire palette.',
    },
    height: { control: { type: 'number', min: 560, max: 1100, step: 20 } },
  },
  args: { accent: 'acid', height: 760 },
  render: (args) => ({
    props: args,
    template: `<demo-brutalist [accent]="accent" [height]="height" />`,
  }),
};

/** Hot: magenta and cyan against the same black rules. */
export const HotAccent: Story = {
  render: () => ({ template: `<demo-brutalist accent="hot" [height]="760" />` }),
};

/** Sky: cyan and amber. The layout never changes, only two variables. */
export const SkyAccent: Story = {
  render: () => ({ template: `<demo-brutalist accent="sky" [height]="760" />` }),
};
