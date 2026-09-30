import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { BreakpointPlayground } from './breakpoint-playground/breakpoint-playground.component';
import { BreakpointSignal } from './breakpoint-signal/breakpoint-signal.component';
import { BreakpointsTable } from './breakpoints-table/breakpoints-table.component';
import { ResponsiveShell as ResponsiveShellComponent } from './responsive-shell/responsive-shell.component';

/**
 * `BreakpointObserver` answers one question: does this media query match right
 * now? It is `matchMedia` with an Angular-friendly stream, for the cases where a
 * CSS media query cannot help because the decision lives in TypeScript.
 */
const meta: Meta = {
  title: 'CDK/Responsive Layout',
  decorators: [
    moduleMetadata({
      imports: [
        BreakpointPlayground,
        BreakpointsTable,
        BreakpointSignal,
        ResponsiveShellComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Pick a constant from `Breakpoints` and watch it match as you resize. */
export const Playground: Story = {
  argTypes: {
    breakpoint: {
      control: 'select',
      options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge', 'Handset', 'Tablet', 'Web'],
      description: 'Key of the `Breakpoints` constant to observe.',
    },
  },
  args: { breakpoint: 'Handset' },
  render: (args) => ({
    props: args,
    template: `<demo-breakpoint-playground [breakpoint]="breakpoint" />`,
  }),
};

/** The full set of `Breakpoints` constants and their live state. */
export const BreakpointConstants: Story = {
  render: () => ({ template: `<demo-breakpoints-table />` }),
};

/** `toSignal` over `observe()` gives you a signal to use in templates and computeds. */
export const AsASignal: Story = {
  render: () => ({ template: `<demo-breakpoint-signal />` }),
};

/** The classic responsive shell: `side` on wide screens, `over` on handsets. */
export const ResponsiveShell: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({ template: `<demo-responsive-shell />` }),
};
