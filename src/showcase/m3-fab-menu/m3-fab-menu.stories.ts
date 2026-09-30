import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { FabMenu } from './m3-fab-menu.component';

const meta: Meta<FabMenu> = {
  title: 'M3 Components/FAB Menu',
  component: FabMenu,
  // Only real inputs; otherwise Storybook also lists computed signals as free inputs.
  parameters: { controls: { include: ['color'] } },
  decorators: [moduleMetadata({ imports: [FabMenu] })],
};

export default meta;
type Story = StoryObj<FabMenu>;

/** Tap the FAB. Then try it from the keyboard: Enter, arrow keys, Escape. */
export const Playground: Story = {
  argTypes: {
    color: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary'] },
    actions: { table: { disable: true } },
  },
  args: { color: 'primary' },
};

/** Tertiary, for a FAB that should stand apart from the rest of the screen. */
export const Tertiary: Story = {
  args: {
    color: 'tertiary',
    actions: [
      { icon: 'photo_camera', label: 'Take photo' },
      { icon: 'image', label: 'Upload image' },
      { icon: 'mic', label: 'Voice note' },
    ],
  },
};
