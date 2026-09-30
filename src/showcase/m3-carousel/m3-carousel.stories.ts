import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Carousel } from './m3-carousel.component';

const meta: Meta<Carousel> = {
  title: 'M3 Components/Carousel',
  component: Carousel,
  // Only real inputs; otherwise Storybook also lists computed signals as free inputs.
  parameters: { controls: { include: ['layout', 'height', 'label'] } },
  decorators: [moduleMetadata({ imports: [Carousel] })],
};

export default meta;
type Story = StoryObj<Carousel>;

/** Step through with the arrows, the keyboard, or a swipe. */
export const Playground: Story = {
  argTypes: {
    layout: { control: 'inline-radio', options: ['multi-browse', 'hero', 'full-screen'] },
    height: { control: { type: 'range', min: 160, max: 420, step: 10 } },
  },
  args: { layout: 'multi-browse', height: 240, label: 'Destinations' },
};

/** Hero: one big item and a sliver of the next, for featured content. */
export const Hero: Story = {
  args: { layout: 'hero', height: 320, label: 'Featured trips' },
};
