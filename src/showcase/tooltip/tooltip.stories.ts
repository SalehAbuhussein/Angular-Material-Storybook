import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { TooltipDisabled } from './tooltip-disabled/tooltip-disabled.component';

/**
 * `matTooltip` is a directive on the element it describes. The message is the
 * value of the directive; everything else is a `matTooltip*` input.
 */
const meta: Meta = {
  title: 'Buttons and Indicators/Tooltip',
  decorators: [
    moduleMetadata({
      imports: [MatTooltipModule, MatButtonModule, MatIconModule, TooltipDisabled],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Hover or focus the button. Keyboard focus opens the tooltip too. */
export const Playground: Story = {
  argTypes: {
    message: { control: 'text' },
    position: {
      control: 'select',
      options: ['above', 'below', 'left', 'right', 'before', 'after'],
    },
    showDelay: { control: { type: 'number', min: 0, step: 100 } },
    hideDelay: { control: { type: 'number', min: 0, step: 100 } },
    disabled: { control: 'boolean' },
  },
  args: {
    message: 'Archive this conversation',
    position: 'below',
    showDelay: 0,
    hideDelay: 0,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button matButton="filled"
              [matTooltip]="message"
              [matTooltipPosition]="position"
              [matTooltipShowDelay]="showDelay"
              [matTooltipHideDelay]="hideDelay"
              [matTooltipDisabled]="disabled">
        Hover me
      </button>`,
  }),
};

/**
 * `above`, `below`, `left`, and `right` are absolute. `before` and `after`
 * follow the reading direction and flip in right-to-left layouts.
 */
export const Positions: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 16px; padding: 48px;">
        <button matButton="outlined" matTooltip="Above" matTooltipPosition="above">above</button>
        <button matButton="outlined" matTooltip="Below" matTooltipPosition="below">below</button>
        <button matButton="outlined" matTooltip="Left" matTooltipPosition="left">left</button>
        <button matButton="outlined" matTooltip="Right" matTooltipPosition="right">right</button>
        <button matButton="outlined" matTooltip="Before" matTooltipPosition="before">before</button>
        <button matButton="outlined" matTooltip="After" matTooltipPosition="after">after</button>
      </div>`,
  }),
};

/** A show delay stops tooltips firing as the pointer crosses a toolbar. A hide delay lets people reach the text. */
export const Delays: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matButton="outlined" matTooltip="Appears immediately">no delay</button>
        <button matButton="outlined" matTooltip="Appears after 500ms" matTooltipShowDelay="500">show 500</button>
        <button matButton="outlined" matTooltip="Stays for 1s after you leave" matTooltipHideDelay="1000">hide 1000</button>
      </div>`,
  }),
};

/** Icon buttons are the one place a tooltip earns its keep, because the icon is the whole label. */
export const OnIconButtons: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matIconButton aria-label="Archive" matTooltip="Archive"><mat-icon>archive</mat-icon></button>
        <button matIconButton aria-label="Snooze" matTooltip="Snooze"><mat-icon>schedule</mat-icon></button>
        <button matIconButton aria-label="Delete" matTooltip="Delete"><mat-icon>delete</mat-icon></button>
      </div>`,
  }),
};

/** Bind `matTooltipDisabled` when the hint only applies in one state. */
export const Disabled: Story = {
  render: () => ({ template: `<docs-tooltip-disabled />` }),
};

/**
 * A tooltip is not a label. The left button has a visible label and the tooltip
 * adds detail; the right one hides its only label in a tooltip, which is wrong.
 */
export const NotALabel: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matButton="filled" matTooltip="Sends the draft to all 240 subscribers">Publish</button>
        <button matIconButton matTooltip="Publish"><mat-icon>send</mat-icon></button>
      </div>`,
  }),
};
