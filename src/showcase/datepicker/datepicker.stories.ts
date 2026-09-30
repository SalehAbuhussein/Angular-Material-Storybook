import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { DatepickerForm } from './datepicker-form/datepicker-form.component';
import { DatepickerRange } from './datepicker-range/datepicker-range.component';

/**
 * The datepicker needs a date adapter. `provideNativeDateAdapter()` from
 * `@angular/material/core` wires up the built-in `Date` adapter. Without it
 * every datepicker throws at runtime.
 */
const meta: Meta = {
  title: 'Form Controls/Datepicker',
  decorators: [
    applicationConfig({ providers: [provideNativeDateAdapter()] }),
    moduleMetadata({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        DatepickerRange,
        DatepickerForm,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** The picker's own inputs. The input element and the toggle stay the same. */
export const Playground: Story = {
  argTypes: {
    touchUi: {
      control: 'boolean',
      description: 'Opens the calendar as a centred modal instead of a dropdown.',
    },
    startView: { control: 'inline-radio', options: ['month', 'year', 'multi-year'] },
    disabled: { control: 'boolean' },
    restoreFocus: { control: 'boolean' },
  },
  args: {
    touchUi: false,
    startView: 'month',
    disabled: false,
    restoreFocus: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Choose a date</mat-label>
          <input matInput [matDatepicker]="picker" [disabled]="disabled" />
          <mat-datepicker-toggle matIconSuffix [for]="picker" />
          <mat-datepicker #picker [touchUi]="touchUi" [startView]="startView" [restoreFocus]="restoreFocus" />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * Three parts, always together: the input with `[matDatepicker]`, the toggle
 * button, and the `<mat-datepicker>` itself.
 */
export const Basic: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Delivery date</mat-label>
          <input matInput [matDatepicker]="picker" />
          <mat-hint>DD/MM/YYYY</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker" />
          <mat-datepicker #picker />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * `min` and `max` go on the input, not on the picker. They grey out dates in
 * the calendar and add `matDatepickerMin` / `matDatepickerMax` errors.
 */
export const MinAndMax: Story = {
  render: () => ({
    props: { min: new Date(), max: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) },
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Within the next 30 days</mat-label>
          <input matInput [matDatepicker]="picker" [min]="min" [max]="max" />
          <mat-datepicker-toggle matIconSuffix [for]="picker" />
          <mat-datepicker #picker />
        </mat-form-field>
      </div>`,
  }),
};

/**
 * `matDatepickerFilter` disables individual dates. Use it for weekends,
 * holidays, or days that are already fully booked.
 */
export const DateFilter: Story = {
  render: () => ({
    props: {
      weekdaysOnly: (date: Date | null) => {
        const day = (date ?? new Date()).getDay();
        return day !== 0 && day !== 6;
      },
    },
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>Weekdays only</mat-label>
          <input matInput [matDatepicker]="picker" [matDatepickerFilter]="weekdaysOnly" />
          <mat-hint>Weekends are disabled</mat-hint>
          <mat-datepicker-toggle matIconSuffix [for]="picker" />
          <mat-datepicker #picker />
        </mat-form-field>
      </div>`,
  }),
};

/** A range picker: one field, two inputs, two controls. */
export const RangePicker: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-datepicker-range /></div>` }),
};

/** A required date with `min`, and both errors handled in one `<mat-error>`. */
export const InReactiveForms: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-datepicker-form /></div>` }),
};
