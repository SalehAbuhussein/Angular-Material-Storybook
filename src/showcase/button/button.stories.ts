import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

/**
 * `MatButton` is one directive family applied through attribute selectors.
 * You never write `<mat-button>`; you write `<button matButton>` and let the
 * attribute pick the appearance.
 */
const meta: Meta = {
  title: 'Buttons and Indicators/Button',
  decorators: [moduleMetadata({ imports: [MatButtonModule, MatIconModule] })],
};

export default meta;
type Story = StoryObj;

/**
 * The single control worth learning first: `matButton="<appearance>"` swaps the
 * whole look without changing markup.
 */
export const Playground: Story = {
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['text', 'filled', 'tonal', 'elevated', 'outlined'],
      description: 'Material 3 button appearance, set as the value of `matButton`.',
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { appearance: 'filled', disabled: false, label: 'Save changes' },
  render: (args) => ({
    props: args,
    template: `<button [matButton]="appearance" [disabled]="disabled">{{ label }}</button>`,
  }),
};

/** All five appearances side by side, ordered from least to most emphasis. */
export const Appearances: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matButton>Text</button>
        <button matButton="outlined">Outlined</button>
        <button matButton="tonal">Tonal</button>
        <button matButton="elevated">Elevated</button>
        <button matButton="filled">Filled</button>
      </div>`,
  }),
};

/**
 * Icon buttons use a different directive: `matIconButton`. The icon is the only
 * child, so the accessible name must come from `aria-label`.
 */
export const IconButtons: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matIconButton aria-label="Add item"><mat-icon>add</mat-icon></button>
        <button matIconButton aria-label="Delete item"><mat-icon>delete</mat-icon></button>
        <button matIconButton disabled aria-label="Archive item"><mat-icon>archive</mat-icon></button>
      </div>`,
  }),
};

/** A button with both icon and text keeps the icon first and the label visible. */
export const WithIcon: Story = {
  argTypes: {
    iconPosition: {
      control: 'inline-radio',
      options: ['start', 'end'],
      description:
        'Where the icon sits. Adding `iconPositionEnd` to the `<mat-icon>` projects it after the label.',
    },
    label: { control: 'text', description: 'Label of the first button.' },
  },
  args: { iconPosition: 'start', label: 'Upload' },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo docs-demo--row">
        @if (iconPosition === 'end') {
          <button matButton="filled">{{ label }} <mat-icon iconPositionEnd>cloud_upload</mat-icon></button>
          <button matButton="outlined">Download <mat-icon iconPositionEnd>download</mat-icon></button>
        } @else {
          <button matButton="filled"><mat-icon>cloud_upload</mat-icon> {{ label }}</button>
          <button matButton="outlined"><mat-icon>download</mat-icon> Download</button>
        }
      </div>`,
  }),
};

/**
 * `<a>` elements take the same directives. Use an anchor when the action
 * navigates and a button when it changes state.
 */
export const LinkButtons: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <a matButton="filled" href="https://material.angular.dev" target="_blank" rel="noreferrer">Open docs</a>
        <a matButton="outlined" routerLink="/">Home</a>
      </div>`,
  }),
};
