import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { SpinnerInButton } from './spinner-in-button/spinner-in-button.component';

/**
 * `<mat-progress-spinner>` and `<mat-spinner>` are the same component under two
 * selectors. Use `<mat-spinner>` when the work has no measurable percentage.
 */
const meta: Meta = {
  title: 'Buttons and Indicators/Progress Spinner',
  decorators: [
    moduleMetadata({
      imports: [MatProgressSpinnerModule, MatButtonModule, SpinnerInButton],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** `value` applies in `determinate` only. `diameter` and `strokeWidth` are plain pixels. */
export const Playground: Story = {
  argTypes: {
    mode: { control: 'inline-radio', options: ['determinate', 'indeterminate'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    diameter: { control: { type: 'range', min: 16, max: 120, step: 4 } },
    strokeWidth: { control: { type: 'range', min: 1, max: 16, step: 1 } },
  },
  args: { mode: 'determinate', value: 65, diameter: 64, strokeWidth: 6 },
  render: (args) => ({
    props: args,
    template: `
      <mat-progress-spinner
        [mode]="mode"
        [value]="value"
        [diameter]="diameter"
        [strokeWidth]="strokeWidth"
        aria-label="Example progress" />`,
  }),
};

/** Two modes. Determinate draws an arc for the percentage; indeterminate spins forever. */
export const Modes: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 32px;">
        <mat-progress-spinner mode="determinate" value="70" aria-label="Sync progress" />
        <mat-progress-spinner mode="indeterminate" aria-label="Loading" />
      </div>`,
  }),
};

/**
 * `<mat-spinner>` is the same component. It reads its own tag name and defaults
 * `mode` to `indeterminate`, so it is the shorter way to write "we are loading".
 */
export const MatSpinnerShorthand: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 32px;">
        <mat-spinner aria-label="Loading results" />
        <mat-progress-spinner mode="indeterminate" aria-label="Loading results" />
      </div>`,
  }),
};

/** `diameter` sets the SVG size. `strokeWidth` sets the ring thickness in the same pixel scale. */
export const Sizing: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 32px;">
        <mat-spinner diameter="20" strokeWidth="2" aria-label="Loading" />
        <mat-spinner diameter="40" aria-label="Loading" />
        <mat-spinner diameter="80" strokeWidth="8" aria-label="Loading" />
      </div>`,
  }),
};

/** Click Save and watch the button swap its own progress indicator in. */
export const InsideAButton: Story = {
  render: () => ({ template: `<docs-spinner-in-button />` }),
};

/** A centred spinner is the standard placeholder while a panel's data loads. */
export const LoadingAPanel: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `
      <div class="docs-surface" style="height: 220px; display: grid; place-items: center; gap: 12px;">
        <mat-spinner diameter="48" aria-label="Loading your projects" />
        <span>Loading your projects</span>
      </div>`,
  }),
};
