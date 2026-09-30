import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ProgressBarLive } from './progress-bar-live/progress-bar-live.component';

/**
 * `<mat-progress-bar>` is a horizontal indicator for work that takes long enough
 * to need explaining. The `mode` input decides whether it reports a number or
 * just says "something is happening".
 */
const meta: Meta = {
  title: 'Buttons and Indicators/Progress Bar',
  decorators: [
    moduleMetadata({
      imports: [MatProgressBarModule, MatButtonModule, ProgressBarLive],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** `value` only matters in `determinate` and `buffer`. `bufferValue` only matters in `buffer`. */
export const Playground: Story = {
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
    },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    bufferValue: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: { mode: 'determinate', value: 45, bufferValue: 70 },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo" style="width: 100%; min-width: 360px;">
        <mat-progress-bar [mode]="mode" [value]="value" [bufferValue]="bufferValue" />
      </div>`,
  }),
};

/** The four modes side by side. */
export const Modes: Story = {
  render: () => ({
    template: `
      <div class="docs-demo" style="width: 100%; min-width: 360px;">
        <span>determinate</span>
        <mat-progress-bar mode="determinate" value="60" />
        <span>indeterminate</span>
        <mat-progress-bar mode="indeterminate" />
        <span>buffer</span>
        <mat-progress-bar mode="buffer" value="35" bufferValue="70" />
        <span>query</span>
        <mat-progress-bar mode="query" />
      </div>`,
  }),
};

/** Bind `value` to a signal. The bar animates between values on its own. */
export const Determinate: Story = {
  render: () => ({ template: `<docs-progress-bar-live />` }),
};

/**
 * `buffer` shows two numbers: `value` is what is done, `bufferValue` is what is
 * loaded and ready to be done. Streaming a video is the classic case.
 */
export const Buffer: Story = {
  render: () => ({
    template: `
      <div class="docs-demo" style="width: 100%; min-width: 360px;">
        <mat-progress-bar mode="buffer" value="30" bufferValue="55" />
        <span>Played 30%, buffered 55%</span>
      </div>`,
  }),
};

/** `query` is the pre-loading state: the request has gone out, nothing has come back. */
export const Query: Story = {
  render: () => ({
    template: `
      <div class="docs-demo" style="width: 100%; min-width: 360px;">
        <mat-progress-bar mode="query" />
        <span>Waiting for the server to respond</span>
      </div>`,
  }),
};

/** A bar pinned under a header reads as page-level progress without shifting the layout. */
export const UnderAHeader: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `
      <div class="docs-surface" style="overflow: hidden;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px;">
          <strong>Import contacts</strong>
          <button matButton>Cancel</button>
        </div>
        <mat-progress-bar mode="indeterminate" />
        <div style="padding: 16px;">Reading the file. This can take a minute for large lists.</div>
      </div>`,
  }),
};
