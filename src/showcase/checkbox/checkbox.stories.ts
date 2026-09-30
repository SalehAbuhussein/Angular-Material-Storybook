import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { CheckboxForm } from './checkbox-form/checkbox-form.component';
import { CheckboxGroup } from './checkbox-group/checkbox-group.component';

/**
 * `<mat-checkbox>` is a component with its own label. It is not a form field
 * control, so it never goes inside `<mat-form-field>`.
 */
const meta: Meta = {
  title: 'Form Controls/Checkbox',
  decorators: [
    moduleMetadata({
      imports: [
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        CheckboxGroup,
        CheckboxForm,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Every input that changes how a single checkbox looks and behaves. */
export const Playground: Story = {
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean', description: 'Visual third state. Not a value.' },
    disabled: { control: 'boolean' },
    labelPosition: { control: 'inline-radio', options: ['after', 'before'] },
    disableRipple: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    checked: true,
    indeterminate: false,
    disabled: false,
    labelPosition: 'after',
    disableRipple: false,
    label: 'Remember this device',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <mat-checkbox
          [checked]="checked"
          [indeterminate]="indeterminate"
          [disabled]="disabled"
          [labelPosition]="labelPosition"
          [disableRipple]="disableRipple">
          {{ label }}
        </mat-checkbox>
      </div>`,
  }),
};

/**
 * Indeterminate is a third visual state, not a third value. `checked` is still
 * a boolean underneath, and clicking always resolves to checked or unchecked.
 */
export const States: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-checkbox>Unchecked</mat-checkbox>
        <mat-checkbox checked>Checked</mat-checkbox>
        <mat-checkbox indeterminate>Indeterminate</mat-checkbox>
        <mat-checkbox disabled>Disabled</mat-checkbox>
        <mat-checkbox disabled checked>Disabled and checked</mat-checkbox>
      </div>`,
  }),
};

/** `labelPosition="before"` puts the label on the left. Use it sparingly. */
export const LabelPosition: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-checkbox labelPosition="after">Label after (default)</mat-checkbox>
        <mat-checkbox labelPosition="before">Label before</mat-checkbox>
      </div>`,
  }),
};

/** A parent checkbox driving three children through signals. */
export const IndeterminateParent: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-checkbox-group /></div>` }),
};

/** `formControlName` on a checkbox, with `Validators.requiredTrue`. */
export const InReactiveForms: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-checkbox-form /></div>` }),
};
