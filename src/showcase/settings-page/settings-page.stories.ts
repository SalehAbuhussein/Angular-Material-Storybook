import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { SettingsPage } from './settings-page.component';

const meta: Meta = {
  title: 'Full Layouts/Settings Page',
  decorators: [moduleMetadata({ imports: [SettingsPage] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Pick a section on the left, change any field, and the save bar slides in at
 * the bottom. Save or discard and it goes away again.
 */
export const Playground: Story = {
  argTypes: {
    initialSection: {
      control: 'inline-radio',
      options: ['profile', 'notifications', 'appearance', 'security'],
      description: 'Which section the screen opens on.',
    },
    stacked: {
      control: 'boolean',
      description: 'Put the section nav above the content, as it would be on a phone.',
    },
    height: { control: { type: 'number', min: 480, max: 1000, step: 20 } },
  },
  args: { initialSection: 'profile', stacked: false, height: 680 },
  render: (args) => ({
    props: args,
    template: `<demo-settings-page
      [initialSection]="initialSection" [stacked]="stacked" [height]="height" />`,
  }),
};

/** Toggles and a dependent select. Turning the digest off makes the day field moot. */
export const NotificationsSection: Story = {
  render: () => ({ template: `<demo-settings-page initialSection="notifications" [height]="640" />` }),
};

/** A destructive action, separated and coloured with the error role. */
export const SecuritySection: Story = {
  render: () => ({ template: `<demo-settings-page initialSection="security" [height]="640" />` }),
};

/** The phone layout: the section list becomes a horizontal strip above the form. */
export const Stacked: Story = {
  render: () => ({
    template: `<div style="max-width: 560px;"><demo-settings-page [stacked]="true" [height]="720" /></div>`,
  }),
};
