import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ButtonGroup } from './m3-button-group.component';
import { FORMAT, VIEWS } from './m3-button-group.constants';

const meta: Meta<ButtonGroup> = {
  title: 'M3 Components/Button Group',
  component: ButtonGroup,
  // Only real inputs; otherwise Storybook also lists computed signals as free inputs.
  parameters: { controls: { include: ['variant', 'size', 'multiple', 'iconOnly', 'label'] } },
  decorators: [moduleMetadata({ imports: [ButtonGroup] })],
};

export default meta;
type Story = StoryObj<ButtonGroup>;

/**
 * Press and hold a button: it widens and squares off while the others give
 * way. Switch `variant` to connected to see the pill selection instead.
 */
export const Playground: Story = {
  argTypes: {
    variant: { control: 'inline-radio', options: ['standard', 'connected'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    multiple: { control: 'boolean', description: 'Allow more than one selected button.' },
    iconOnly: { control: 'boolean', description: 'Hide the labels. Only meaningful with icons.' },
    items: { table: { disable: true } },
    initial: { table: { disable: true } },
  },
  args: {
    items: VIEWS,
    variant: 'standard',
    size: 'md',
    multiple: false,
    iconOnly: false,
    label: 'Calendar view',
    initial: ['week'],
  },
};

/** The connected group, single select: a segmented control with M3 shapes. */
export const Connected: Story = {
  args: { ...Playground.args, variant: 'connected' },
};

/** Icon toggles, several on at once: a text formatting bar. */
export const FormattingToggles: Story = {
  args: {
    items: FORMAT,
    variant: 'standard',
    size: 'sm',
    multiple: true,
    iconOnly: true,
    label: 'Text formatting',
    initial: ['bold'],
  },
};

/** Large buttons for touch-first screens. */
export const Large: Story = {
  args: { ...Playground.args, size: 'lg', items: VIEWS.slice(0, 3) },
};
