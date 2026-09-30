import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ChipsEditable } from './chips-editable/chips-editable.component';
import { ChipsInput } from './chips-input/chips-input.component';
import { ChipsListbox } from './chips-listbox/chips-listbox.component';

/**
 * Chips come in three containers and the container decides the semantics:
 * `<mat-chip-set>` is decorative, `<mat-chip-listbox>` is a selection control,
 * and `<mat-chip-grid>` is a text input for entering a list.
 */
const meta: Meta = {
  title: 'Form Controls/Chips',
  decorators: [
    moduleMetadata({
      imports: [
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ChipsInput,
        ChipsEditable,
        ChipsListbox,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** A single chip inside a plain `<mat-chip-set>`. */
export const Playground: Story = {
  argTypes: {
    removable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    highlighted: { control: 'boolean', description: 'Draws the chip in the selected colour.' },
    disableRipple: { control: 'boolean' },
  },
  args: {
    removable: true,
    disabled: false,
    highlighted: false,
    disableRipple: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <mat-chip-set aria-label="Playground">
          <mat-chip
            [removable]="removable"
            [disabled]="disabled"
            [highlighted]="highlighted"
            [disableRipple]="disableRipple">
            Angular
            @if (removable) {
              <button matChipRemove aria-label="Remove Angular"><mat-icon>cancel</mat-icon></button>
            }
          </mat-chip>
        </mat-chip-set>
      </div>`,
  }),
};

/**
 * `<mat-chip-set>` is presentation only. Use it to display values that came
 * from somewhere else; it is not a control and has no value.
 */
export const ChipSet: Story = {
  render: () => ({
    props: { skills: ['TypeScript', 'RxJS', 'Signals', 'SCSS'] },
    template: `
      <div class="docs-demo">
        <mat-chip-set aria-label="Skills">
          @for (skill of skills; track skill) {
            <mat-chip>{{ skill }}</mat-chip>
          }
        </mat-chip-set>
      </div>`,
  }),
};

/** Tag entry with `<mat-chip-grid>` and `matChipInputFor`. */
export const TagInput: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-chips-input /></div>` }),
};

/** `editable` on a `<mat-chip-row>` turns the chip into an inline text field. */
export const EditableChips: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-chips-editable /></div>` }),
};

/**
 * `<mat-chip-listbox>` is a selection control with a value, so it binds with
 * `ngModel` or `formControlName` like any other.
 */
export const SelectionListbox: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-chips-listbox /></div>` }),
};

/** A single-select listbox behaves like a compact set of radio buttons. */
export const SingleSelect: Story = {
  render: () => ({
    props: { sizes: ['S', 'M', 'L', 'XL'] },
    template: `
      <div class="docs-demo">
        <mat-chip-listbox aria-label="Size">
          @for (size of sizes; track size) {
            <mat-chip-option [value]="size">{{ size }}</mat-chip-option>
          }
        </mat-chip-listbox>
      </div>`,
  }),
};
