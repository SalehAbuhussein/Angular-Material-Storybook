import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { SelectChange } from './select-change/select-change.component';
import { SelectCompare } from './select-compare/select-compare.component';
import { SelectTrigger } from './select-trigger/select-trigger.component';

/**
 * `<mat-select>` is a full component, not a directive on a native `<select>`.
 * It goes inside a `<mat-form-field>` and holds `<mat-option>` children.
 */
const meta: Meta = {
  title: 'Form Controls/Select',
  decorators: [
    moduleMetadata({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        FormsModule,
        SelectCompare,
        SelectTrigger,
        SelectChange,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** The inputs that change how the select behaves, all on one field. */
export const Playground: Story = {
  argTypes: {
    multiple: { control: 'boolean', description: 'Turns the panel into a checkbox list.' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
    hideSingleSelectionIndicator: {
      control: 'boolean',
      description: 'Hides the checkmark next to the selected option.',
    },
    panelWidth: {
      control: 'select',
      options: ['auto', '320px'],
      description: '`auto` sizes the panel to its content. A length pins it.',
    },
  },
  args: {
    multiple: false,
    disabled: false,
    required: false,
    placeholder: 'Pick one',
    hideSingleSelectionIndicator: false,
    panelWidth: 'auto',
  },
  render: (args) => ({
    props: { ...args, fruits: ['Apple', 'Banana', 'Cherry', 'Dragonfruit'] },
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Fruit</mat-label>
          <mat-select
            [multiple]="multiple"
            [disabled]="disabled"
            [required]="required"
            [placeholder]="placeholder"
            [hideSingleSelectionIndicator]="hideSingleSelectionIndicator"
            [panelWidth]="panelWidth">
            @for (fruit of fruits; track fruit) {
              <mat-option [value]="fruit">{{ fruit }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>`,
  }),
};

/**
 * An option with no `value` clears the selection. Give it an empty label or a
 * dash so it reads as "none".
 */
export const Basic: Story = {
  render: () => ({
    props: { sizes: ['Small', 'Medium', 'Large'] },
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Size</mat-label>
          <mat-select value="Medium">
            <mat-option>None</mat-option>
            @for (size of sizes; track size) {
              <mat-option [value]="size">{{ size }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>`,
  }),
};

/** `<mat-optgroup>` adds a sticky heading and can disable a whole group. */
export const Groups: Story = {
  render: () => ({
    props: {
      groups: [
        { label: 'Fruit', disabled: false, items: ['Apple', 'Banana', 'Cherry'] },
        { label: 'Vegetable', disabled: false, items: ['Carrot', 'Leek'] },
        { label: 'Out of season', disabled: true, items: ['Rhubarb', 'Quince'] },
      ],
    },
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Ingredient</mat-label>
          <mat-select>
            @for (group of groups; track group.label) {
              <mat-optgroup [label]="group.label" [disabled]="group.disabled">
                @for (item of group.items; track item) {
                  <mat-option [value]="item">{{ item }}</mat-option>
                }
              </mat-optgroup>
            }
          </mat-select>
        </mat-form-field>
      </div>`,
  }),
};

/**
 * `multiple` turns each option into a checkbox and the value into an array.
 * The closed field shows a comma separated list unless you override the trigger.
 */
export const Multiple: Story = {
  render: () => ({
    props: { langs: ['TypeScript', 'Rust', 'Go', 'Python', 'Elixir'] },
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Languages</mat-label>
          <mat-select multiple [value]="['TypeScript', 'Rust']">
            @for (lang of langs; track lang) {
              <mat-option [value]="lang">{{ lang }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>`,
  }),
};

/** Object values need `compareWith` or nothing preselects. */
export const CompareWith: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-select-compare /></div>` }),
};

/** `<mat-select-trigger>` replaces the closed-state text. */
export const CustomTrigger: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-select-trigger /></div>` }),
};

/** `selectionChange` fires with the new value on every user pick. */
export const SelectionChange: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-select-change /></div>` }),
};
