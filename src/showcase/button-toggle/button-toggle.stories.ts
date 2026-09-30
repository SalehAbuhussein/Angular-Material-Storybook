import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ButtonToggleForm } from './button-toggle-form/button-toggle-form.component';
import { ButtonToggleMultiple } from './button-toggle-multiple/button-toggle-multiple.component';

/**
 * A button toggle group is a segmented control. Single mode is a radio group
 * that looks like buttons; multiple mode is a set of checkboxes that looks like
 * a toolbar.
 */
const meta: Meta = {
  title: 'Form Controls/Button Toggle',
  decorators: [
    moduleMetadata({
      imports: [
        MatButtonToggleModule,
        MatIconModule,
        ReactiveFormsModule,
        ButtonToggleForm,
        ButtonToggleMultiple,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Every group-level input, on a three-option group. */
export const Playground: Story = {
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['standard', 'legacy'],
      description: '`standard` is the Material 3 look. `legacy` is the old flat one.',
    },
    multiple: { control: 'boolean' },
    vertical: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hideSingleSelectionIndicator: {
      control: 'boolean',
      description: 'Drops the checkmark shown on the selected toggle.',
    },
  },
  args: {
    appearance: 'standard',
    multiple: false,
    vertical: false,
    disabled: false,
    hideSingleSelectionIndicator: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <mat-button-toggle-group
          [appearance]="appearance"
          [multiple]="multiple"
          [vertical]="vertical"
          [disabled]="disabled"
          [hideSingleSelectionIndicator]="hideSingleSelectionIndicator"
          aria-label="Alignment">
          <mat-button-toggle value="left">Left</mat-button-toggle>
          <mat-button-toggle value="center">Center</mat-button-toggle>
          <mat-button-toggle value="right">Right</mat-button-toggle>
        </mat-button-toggle-group>
      </div>`,
  }),
};

/**
 * Single selection is the default: one value, and clicking the selected toggle
 * does not clear it.
 */
export const SingleSelection: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-button-toggle-group value="week" aria-label="Time range">
          <mat-button-toggle value="day">Day</mat-button-toggle>
          <mat-button-toggle value="week">Week</mat-button-toggle>
          <mat-button-toggle value="month">Month</mat-button-toggle>
        </mat-button-toggle-group>
      </div>`,
  }),
};

/** `multiple` makes the value an array and lets every toggle turn off. */
export const MultipleSelection: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-button-toggle-multiple /></div>` }),
};

/** `standard` is the Material 3 look. `legacy` keeps the older flat style. */
export const Appearance: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-button-toggle-group appearance="standard" value="a" aria-label="Standard">
          <mat-button-toggle value="a">Standard</mat-button-toggle>
          <mat-button-toggle value="b">Two</mat-button-toggle>
        </mat-button-toggle-group>

        <mat-button-toggle-group appearance="legacy" value="a" aria-label="Legacy">
          <mat-button-toggle value="a">Legacy</mat-button-toggle>
          <mat-button-toggle value="b">Two</mat-button-toggle>
        </mat-button-toggle-group>
      </div>`,
  }),
};

/** `vertical` stacks the toggles, useful in a narrow sidebar. */
export const Vertical: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-button-toggle-group vertical value="unread" aria-label="Mail filter">
          <mat-button-toggle value="all">All</mat-button-toggle>
          <mat-button-toggle value="unread">Unread</mat-button-toggle>
          <mat-button-toggle value="flagged">Flagged</mat-button-toggle>
        </mat-button-toggle-group>
      </div>`,
  }),
};

/** `formControlName` on the group, with icon-only toggles. */
export const InReactiveForms: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-button-toggle-form /></div>` }),
};
