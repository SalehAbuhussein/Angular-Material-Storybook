import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { Wizard } from './wizard.component';

const meta: Meta = {
  title: 'Full Layouts/Multi Step Form',
  decorators: [moduleMetadata({ imports: [Wizard] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Try to press Next with the first step empty: a linear stepper refuses. Fill
 * it in, pick a plan, then use the review step to jump back and change an
 * answer.
 */
export const Playground: Story = {
  argTypes: {
    linear: {
      control: 'boolean',
      description: 'Linear blocks Next until the current step’s form is valid.',
    },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    height: { control: { type: 'number', min: 520, max: 1000, step: 20 } },
  },
  args: { linear: true, orientation: 'horizontal', height: 720 },
  render: (args) => ({
    props: args,
    template: `<demo-wizard [linear]="linear" [orientation]="orientation" [height]="height" />`,
  }),
};

/** Vertical steps keep the labels readable on a narrow screen. */
export const Vertical: Story = {
  render: () => ({ template: `<demo-wizard orientation="vertical" [height]="820" />` }),
};

/**
 * Non linear: every step is reachable immediately. Useful for editing an
 * existing record, wrong for a first-run signup.
 */
export const NonLinear: Story = {
  render: () => ({ template: `<demo-wizard [linear]="false" [height]="720" />` }),
};
