import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { M3SplitButton } from './m3-split-button.component';

const meta: Meta<M3SplitButton> = {
  title: 'M3 Components/Split Button',
  component: M3SplitButton,
  // Only real inputs; otherwise Storybook also lists computed signals as free inputs.
  parameters: { controls: { include: ['label', 'icon', 'appearance', 'size'] } },
  decorators: [moduleMetadata({ imports: [M3SplitButton] })],
};

export default meta;
type Story = StoryObj<M3SplitButton>;

/** Open the menu and watch the trailing half turn round. */
export const Playground: Story = {
  argTypes: {
    appearance: { control: 'inline-radio', options: ['filled', 'tonal', 'elevated', 'outlined'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    options: { table: { disable: true } },
  },
  args: { label: 'Send', icon: 'send', appearance: 'filled', size: 'md' },
};

/** All four appearances side by side, for picking the right emphasis. */
export const Appearances: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center">
        <m3-split-button appearance="filled" />
        <m3-split-button appearance="tonal" />
        <m3-split-button appearance="elevated" />
        <m3-split-button appearance="outlined" />
      </div>`,
  }),
};

/** A different job: exporting, with the formats in the menu. */
export const Export: Story = {
  args: {
    label: 'Export PDF',
    icon: 'picture_as_pdf',
    appearance: 'tonal',
    size: 'md',
    options: [
      { icon: 'table_view', label: 'Export CSV' },
      { icon: 'description', label: 'Export Word' },
      { icon: 'image', label: 'Export PNG' },
    ],
  },
};
