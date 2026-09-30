import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { FormState } from './form-state/form-state.component';
import { FormsOverview } from './forms-overview.component';

/**
 * Every control in this chapter follows the same three rules: bind with
 * `formControlName`, validate on the control, and show the message in
 * `<mat-error>` once the control has been touched.
 */
const meta: Meta = {
  title: 'Form Controls/Putting It Together',
  decorators: [
    moduleMetadata({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsOverview,
        FormState,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/**
 * The whole form. Submit it empty to see every error appear at once, then fill
 * it in and watch them clear.
 */
export const Playground: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-signup-form /></div>` }),
};

/** The same form, so you can compare it against the sections below. */
export const SignupForm: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-signup-form /></div>` }),
};

/**
 * Why the error waits: `touched` only becomes true after the control has been
 * focused and blurred. Type an invalid address and watch nothing happen until
 * you leave the field.
 */
export const WhenErrorsAppear: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-form-state /></div>` }),
};
