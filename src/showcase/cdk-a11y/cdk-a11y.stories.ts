import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { AnnouncerPlayground } from './announcer-playground/announcer-playground.component';
import { FocusMonitorDemo } from './focus-monitor/focus-monitor.component';
import { FocusTrapDemo } from './focus-trap/focus-trap.component';
import { HighContrast } from './high-contrast/high-contrast.component';
import { LiveAnnouncerDemo } from './live-announcer/live-announcer.component';
import { MonitorSubtree } from './monitor-subtree/monitor-subtree.component';

/**
 * `@angular/cdk/a11y` is the toolbox Angular Material uses on itself: announcing
 * changes, trapping focus in overlays, and knowing how an element got focus.
 */
const meta: Meta = {
  title: 'CDK/Accessibility',
  decorators: [
    moduleMetadata({
      imports: [
        AnnouncerPlayground,
        LiveAnnouncerDemo,
        FocusTrapDemo,
        FocusMonitorDemo,
        MonitorSubtree,
        HighContrast,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** `polite` waits for a pause, `assertive` interrupts. Use `assertive` sparingly. */
export const Playground: Story = {
  argTypes: {
    message: { control: 'text', description: 'Text passed to `LiveAnnouncer.announce()`.' },
    politeness: {
      control: 'inline-radio',
      options: ['polite', 'assertive', 'off'],
      description: 'The `aria-live` politeness used for the announcement.',
    },
  },
  args: { message: 'Report generated', politeness: 'polite' },
  render: (args) => ({
    props: args,
    template: `<demo-announcer-playground [message]="message" [politeness]="politeness" />`,
  }),
};

/** Announce what changed when the change is not where the focus is. */
export const LiveAnnouncerInPractice: Story = {
  render: () => ({ template: `<demo-live-announcer />` }),
};

/** A focus trap keeps Tab inside a panel, which is what makes a modal modal. */
export const FocusTrap: Story = {
  render: () => ({ template: `<demo-focus-trap />` }),
};

/** Distinguish keyboard focus from mouse focus. */
export const MonitoringFocus: Story = {
  render: () => ({ template: `<demo-focus-monitor />` }),
};

/** Watch a whole container instead of one element. */
export const MonitoringASubtree: Story = {
  render: () => ({ template: `<demo-monitor-subtree />` }),
};

/** What the CDK detects and which classes it adds. */
export const HighContrastHelpers: Story = {
  render: () => ({ template: `<demo-high-contrast />` }),
};
