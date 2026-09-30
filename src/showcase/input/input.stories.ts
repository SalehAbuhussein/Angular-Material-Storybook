import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { InputCounter } from './input-counter/input-counter.component';
import { InputPassword } from './input-password/input-password.component';

/**
 * `matInput` is a directive, not an element. You put it on a native `<input>`,
 * `<textarea>`, or `<select>` and keep every native behaviour: autofill,
 * validation, `type`, mobile keyboards.
 */
const meta: Meta = {
  title: 'Form Controls/Input',
  decorators: [
    moduleMetadata({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        InputCounter,
        InputPassword,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** One `matInput` with every input that matters exposed as a control. */
export const Playground: Story = {
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Native input type. It reaches the DOM unchanged.',
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabledInteractive: {
      control: 'boolean',
      description: 'Keeps a disabled input focusable so a tooltip can explain why.',
    },
  },
  args: {
    type: 'email',
    label: 'Work email',
    placeholder: 'you@company.com',
    required: true,
    disabled: false,
    readonly: false,
    disabledInteractive: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>{{ label }}</mat-label>
          <input
            matInput
            [type]="type"
            [placeholder]="placeholder"
            [required]="required"
            [disabled]="disabled"
            [readonly]="readonly"
            [disabledInteractive]="disabledInteractive" />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * The `type` attribute is passed straight to the DOM, so mobile keyboards,
 * spinners, and browser autofill all behave as they normally would.
 */
export const Types: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" autocomplete="email" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Phone</mat-label>
          <input matInput type="tel" autocomplete="tel" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Quantity</mat-label>
          <input matInput type="number" min="1" max="99" value="3" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Website</mat-label>
          <input matInput type="url" placeholder="https://" />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * `<textarea matInput>` works the same way. Set `rows`, or use the CDK
 * `cdkTextareaAutosize` directive when you want it to grow with the content.
 */
export const Textarea: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput rows="4" placeholder="What changed?"></textarea>
        </mat-form-field>
      </div>`,
  }),
};

/**
 * Native validation attributes drive the error state. No Angular validators
 * needed here: `required` and `type="email"` are enough for the field to flip.
 */
export const NativeValidation: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" required ngModel name="email" />
          <mat-error>Enter a valid email address</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Username</mat-label>
          <input matInput required minlength="3" ngModel name="username" />
          <mat-error>At least three characters</mat-error>
        </mat-form-field>
      </div>`,
  }),
};

/** A counter in the end hint, driven by a signal and capped with `maxlength`. */
export const CharacterCounter: Story = {
  render: () => ({
    template: `<div class="docs-demo"><docs-input-counter /></div>`,
  }),
};

/** A suffix icon button that flips `type` between `password` and `text`. */
export const PasswordToggle: Story = {
  render: () => ({
    template: `<div class="docs-demo"><docs-input-password /></div>`,
  }),
};
