import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Profile } from './profile.component';

const meta: Meta = {
  title: 'Full Layouts/Profile Page',
  decorators: [moduleMetadata({ imports: [Profile] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Press Edit profile, change the name, and watch the header and the avatar
 * initials follow. Cancel puts everything back. Follow bumps the count.
 */
export const Playground: Story = {
  argTypes: {
    startEditing: { control: 'boolean', description: 'Open the details card in edit mode.' },
    height: { control: { type: 'number', min: 560, max: 1000, step: 20 } },
  },
  args: { startEditing: false, height: 760 },
  render: (args) => ({
    props: args,
    template: `<demo-profile [startEditing]="startEditing" [height]="height" />`,
  }),
};

/** Read mode: a definition list, not a form full of disabled inputs. */
export const ReadMode: Story = {
  render: () => ({ template: `<demo-profile [height]="720" />` }),
};

/** Edit mode: the same card, same place, with Save and Cancel in the actions row. */
export const EditMode: Story = {
  render: () => ({ template: `<demo-profile [startEditing]="true" [height]="760" />` }),
};

/** Narrow: the hero wraps and the project grid becomes one column. */
export const Narrow: Story = {
  render: () => ({
    template: `<div style="max-width: 460px;"><demo-profile [height]="900" /></div>`,
  }),
};
