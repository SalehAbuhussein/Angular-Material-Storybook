import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { EmptyAndError } from './empty-and-error.component';

const meta: Meta = {
  title: 'Full Layouts/Empty, Loading and Error',
  decorators: [moduleMetadata({ imports: [EmptyAndError] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Switch between the five states from the control panel, or leave it on `auto`
 * and type in the search box to reach `no-results` the way a user would.
 */
export const Playground: Story = {
  argTypes: {
    forceState: {
      control: 'select',
      options: ['auto', 'loading', 'error', 'empty', 'no-results', 'ready'],
      description: '`auto` derives the state from the data and the search box.',
    },
    offlineBanner: { control: 'boolean', description: 'Show the stale-data banner along the top.' },
    height: { control: { type: 'number', min: 400, max: 900, step: 20 } },
  },
  args: { forceState: 'ready', offlineBanner: false, height: 560 },
  render: (args) => ({
    props: args,
    template: `<demo-states
      [forceState]="forceState" [offlineBanner]="offlineBanner" [height]="height" />`,
  }),
};

/** Skeletons keep the page the right shape, so nothing jumps when data lands. */
export const Loading: Story = {
  render: () => ({ template: `<demo-states forceState="loading" [height]="520" />` }),
};

/** First run: no data has ever existed. Offer the action that creates some. */
export const EmptyFirstRun: Story = {
  render: () => ({ template: `<demo-states forceState="empty" [height]="520" />` }),
};

/** The user caused this one, so the way out is to undo what they did. */
export const NoResults: Story = {
  render: () => ({
    template: `<demo-states forceState="no-results" initialQuery="acme corp" [height]="520" />`,
  }),
};

/** A failure states what happened, what it means, and how to retry. */
export const Error: Story = {
  render: () => ({ template: `<demo-states forceState="error" [height]="520" />` }),
};

/** Degraded but usable: a banner, not a blocking dialog. */
export const OfflineBanner: Story = {
  render: () => ({
    template: `<demo-states forceState="ready" [offlineBanner]="true" [height]="520" />`,
  }),
};
