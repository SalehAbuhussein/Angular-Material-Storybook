import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Login } from './login.component';

const meta: Meta = {
  title: 'Full Layouts/Sign In',
  decorators: [moduleMetadata({ imports: [Login] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Submit empty to see validation. Sign in with the password `wrongpass` to
 * see the failure banner, or any other 8+ character password to succeed.
 */
export const Playground: Story = {
  argTypes: {
    showError: { control: 'boolean', description: 'Start with the failed sign in banner showing.' },
    height: { control: { type: 'number', min: 420, max: 900, step: 20 } },
  },
  args: { showError: false, height: 640 },
  render: (args) => ({
    props: args,
    template: `<demo-login [showError]="showError" [height]="height" />`,
  }),
};

/** Submitting empty marks both controls touched, so every error shows at once. */
export const Validation: Story = {
  render: () => ({ template: `<demo-login [height]="640" />` }),
};

/** A rejected sign in: one message above the form, not a per-field error. */
export const FailedSignIn: Story = {
  render: () => ({ template: `<demo-login [showError]="true" [height]="640" />` }),
};
