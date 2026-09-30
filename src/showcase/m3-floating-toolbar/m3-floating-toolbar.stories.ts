import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { M3FloatingToolbar } from './m3-floating-toolbar.component';

const meta: Meta<M3FloatingToolbar> = {
  title: 'M3 Components/Floating Toolbar',
  component: M3FloatingToolbar,
  // Only real inputs; otherwise Storybook also lists computed signals as free inputs.
  parameters: { controls: { include: ['variant', 'withFab', 'height'] } },
  decorators: [moduleMetadata({ imports: [M3FloatingToolbar] })],
};

export default meta;
type Story = StoryObj<M3FloatingToolbar>;

/** Scroll the text: down hides the toolbar, up brings it back. */
export const Playground: Story = {
  argTypes: {
    variant: { control: 'inline-radio', options: ['standard', 'vibrant'] },
    withFab: { control: 'boolean', description: 'Show the paired FAB.' },
    height: { control: { type: 'range', min: 320, max: 720, step: 20 } },
  },
  args: { variant: 'standard', withFab: true, height: 480 },
};

/** Vibrant: the toolbar takes the primary container colour to stand out. */
export const Vibrant: Story = {
  args: { variant: 'vibrant', withFab: true, height: 480 },
};
