import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { AppShell } from './app-shell.component';

const meta: Meta = {
  title: 'Full Layouts/App Shell',
  decorators: [moduleMetadata({ imports: [AppShell] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * The whole frame in one component. Force the drawer mode to see how `side` and
 * `over` differ, or leave it on `auto` and resize the preview.
 */
export const Playground: Story = {
  argTypes: {
    forceMode: {
      control: 'inline-radio',
      options: ['auto', 'side', 'over'],
      description: '`auto` lets `BreakpointObserver` pick. The others override it.',
    },
    railWhenClosed: {
      control: 'boolean',
      description: 'Shrink the drawer to a 72px icon rail instead of hiding it.',
    },
    height: { control: { type: 'number', min: 400, max: 900, step: 20 } },
  },
  args: { forceMode: 'auto', railWhenClosed: false, height: 640 },
  render: (args) => ({
    props: args,
    template: `<demo-app-shell [forceMode]="forceMode" [railWhenClosed]="railWhenClosed" [height]="height" />`,
  }),
};

/** The desktop layout: the drawer shares the row with the content, no backdrop. */
export const DesktopSide: Story = {
  render: () => ({ template: `<demo-app-shell forceMode="side" [height]="640" />` }),
};

/**
 * The phone layout: the drawer floats over the content on a backdrop and closes
 * itself after you pick a destination.
 */
export const HandsetOver: Story = {
  render: () => ({ template: `<demo-app-shell forceMode="over" [height]="640" />` }),
};

/** Icon rail: the drawer stays visible at 72px and labels move into tooltips. */
export const IconRail: Story = {
  render: () => ({ template: `<demo-app-shell forceMode="side" [railWhenClosed]="true" [height]="640" />` }),
};
