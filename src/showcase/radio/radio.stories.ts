import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { RadioForm } from './radio-form/radio-form.component';

/**
 * Radios are one choice out of a visible set. The group owns the value and the
 * `name`; the buttons only supply their own `value` and label.
 */
const meta: Meta = {
  title: 'Form Controls/Radio',
  decorators: [
    moduleMetadata({
      imports: [MatRadioModule, MatButtonModule, ReactiveFormsModule, RadioForm],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Group-level inputs cascade to every `<mat-radio-button>` inside. */
export const Playground: Story = {
  argTypes: {
    labelPosition: { control: 'inline-radio', options: ['after', 'before'] },
    disabled: { control: 'boolean', description: 'Disables every button in the group.' },
    required: { control: 'boolean' },
    disableRipple: { control: 'boolean' },
  },
  args: {
    labelPosition: 'after',
    disabled: false,
    required: false,
    disableRipple: false,
  },
  render: (args) => ({
    props: { ...args, plans: ['Free', 'Pro', 'Enterprise'] },
    template: `
      <div class="docs-demo">
        <mat-radio-group
          value="Pro"
          [labelPosition]="labelPosition"
          [disabled]="disabled"
          [required]="required"
          aria-label="Plan">
          @for (plan of plans; track plan) {
            <mat-radio-button [value]="plan" [disableRipple]="disableRipple">{{ plan }}</mat-radio-button>
          }
        </mat-radio-group>
      </div>`,
  }),
};

/**
 * The group is the control. Without a wrapping `<mat-radio-group>` the buttons
 * do not know about each other and more than one can be selected.
 */
export const Basic: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-radio-group value="medium" aria-label="Roast">
          <mat-radio-button value="light">Light</mat-radio-button>
          <mat-radio-button value="medium">Medium</mat-radio-button>
          <mat-radio-button value="dark">Dark</mat-radio-button>
        </mat-radio-group>
      </div>`,
  }),
};

/**
 * Radios have no built-in layout. Stack them with flexbox when the labels are
 * long, which is most of the time.
 */
export const Layout: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-radio-group value="b" aria-label="Horizontal example" style="display: flex; gap: 16px;">
          <mat-radio-button value="a">Yes</mat-radio-button>
          <mat-radio-button value="b">No</mat-radio-button>
          <mat-radio-button value="c">Maybe</mat-radio-button>
        </mat-radio-group>

        <mat-radio-group
          value="monthly"
          aria-label="Billing period"
          style="display: flex; flex-direction: column; gap: 4px;">
          <mat-radio-button value="monthly">Monthly, cancel any time</mat-radio-button>
          <mat-radio-button value="yearly">Yearly, two months free</mat-radio-button>
        </mat-radio-group>
      </div>`,
  }),
};

/** A single button can be disabled without disabling the group. */
export const DisabledOption: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-radio-group value="standard" aria-label="Shipping" style="display: flex; flex-direction: column; gap: 4px;">
          <mat-radio-button value="standard">Standard</mat-radio-button>
          <mat-radio-button value="express">Express</mat-radio-button>
          <mat-radio-button value="same-day" disabled>Same day (not available here)</mat-radio-button>
        </mat-radio-group>
      </div>`,
  }),
};

/** `formControlName` on the group, with a `<fieldset>` for the group name. */
export const InReactiveForms: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-radio-form /></div>` }),
};
