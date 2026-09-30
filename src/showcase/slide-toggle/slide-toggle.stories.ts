import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { SlideToggleSettings } from './slide-toggle-settings/slide-toggle-settings.component';

/**
 * `<mat-slide-toggle>` is a checkbox with a different promise: flipping it
 * takes effect now, not on submit.
 */
const meta: Meta = {
  title: 'Form Controls/Slide Toggle',
  decorators: [
    moduleMetadata({
      imports: [
        MatSlideToggleModule,
        MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule,
        SlideToggleSettings,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Every input on a single toggle. */
export const Playground: Story = {
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelPosition: { control: 'inline-radio', options: ['after', 'before'] },
    hideIcon: { control: 'boolean', description: 'Removes the checkmark inside the thumb.' },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the toggle so the label and switch sit at opposite edges.',
    },
    label: { control: 'text' },
  },
  args: {
    checked: true,
    disabled: false,
    labelPosition: 'after',
    hideIcon: false,
    fullWidth: false,
    label: 'Enable notifications',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo" style="width: 320px;">
        <mat-slide-toggle
          [checked]="checked"
          [disabled]="disabled"
          [labelPosition]="labelPosition"
          [hideIcon]="hideIcon"
          [fullWidth]="fullWidth">
          {{ label }}
        </mat-slide-toggle>
      </div>`,
  }),
};

/**
 * Same data, different promise. The checkbox says "this will happen when you
 * submit". The toggle says "this is happening now".
 */
export const VersusCheckbox: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <p>Form, applied on submit:</p>
        <mat-checkbox checked>Send me a receipt</mat-checkbox>

        <p>Setting, applied immediately:</p>
        <mat-slide-toggle checked>Dark mode</mat-slide-toggle>
      </div>`,
  }),
};

/** `fullWidth` pushes the switch to the far edge, the usual settings row look. */
export const FullWidth: Story = {
  render: () => ({
    template: `
      <div class="docs-surface" style="padding: 16px;">
        <mat-slide-toggle fullWidth checked>Wi-Fi</mat-slide-toggle>
        <mat-slide-toggle fullWidth>Bluetooth</mat-slide-toggle>
        <mat-slide-toggle fullWidth disabled>Airplane mode</mat-slide-toggle>
      </div>`,
  }),
};

/** `hideIcon` drops the checkmark for a plainer switch. */
export const HideIcon: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-slide-toggle checked>With icon (default)</mat-slide-toggle>
        <mat-slide-toggle checked hideIcon>Without icon</mat-slide-toggle>
      </div>`,
  }),
};

/** Toggles in a reactive form, each one saved as it changes. */
export const InReactiveForms: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-slide-toggle-settings /></div>` }),
};
