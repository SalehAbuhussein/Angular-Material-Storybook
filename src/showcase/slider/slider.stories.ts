import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { SliderForm } from './slider-form/slider-form.component';
import { SliderRange } from './slider-range/slider-range.component';

/**
 * `<mat-slider>` is a wrapper. The value lives on a native `<input>` inside it
 * carrying `matSliderThumb`, which is why `formControlName` and `ngModel` go on
 * the input, never on the slider.
 */
const meta: Meta = {
  title: 'Form Controls/Slider',
  decorators: [
    moduleMetadata({
      imports: [MatSliderModule, FormsModule, ReactiveFormsModule, SliderForm, SliderRange],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Every slider input, on a single thumb. */
export const Playground: Story = {
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    discrete: { control: 'boolean', description: 'Shows the value bubble while dragging.' },
    showTickMarks: { control: 'boolean', description: 'Draws a dot at every step.' },
    disabled: { control: 'boolean' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    discrete: false,
    showTickMarks: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <mat-slider
          [min]="min"
          [max]="max"
          [step]="step"
          [discrete]="discrete"
          [showTickMarks]="showTickMarks"
          [disabled]="disabled"
          style="width: 320px;">
          <input matSliderThumb value="50" aria-label="Playground value" />
        </mat-slider>
      </div>`,
  }),
};

/**
 * The smallest useful slider. The `<input matSliderThumb>` child is required:
 * without it the slider has no value and nothing to drag.
 */
export const Basic: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-slider style="width: 320px;">
          <input matSliderThumb value="30" aria-label="Brightness" />
        </mat-slider>
      </div>`,
  }),
};

/**
 * `discrete` adds the value bubble. `showTickMarks` marks each step. Together
 * they turn a continuous slider into a visible set of choices.
 */
export const DiscreteAndTicks: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <mat-slider min="0" max="10" step="1" discrete style="width: 320px;">
          <input matSliderThumb value="4" aria-label="Discrete only" />
        </mat-slider>

        <mat-slider min="0" max="10" step="1" discrete showTickMarks style="width: 320px;">
          <input matSliderThumb value="4" aria-label="Discrete with ticks" />
        </mat-slider>
      </div>`,
  }),
};

/**
 * `displayWith` formats the bubble. It only changes the label, never the value,
 * so the control still holds a plain number.
 */
export const DisplayWith: Story = {
  render: () => ({
    props: { format: (value: number) => `${value} min` },
    template: `
      <div class="docs-demo">
        <mat-slider min="0" max="120" step="15" discrete [displayWith]="format" style="width: 320px;">
          <input matSliderThumb value="45" aria-label="Session length" />
        </mat-slider>
      </div>`,
  }),
};

/**
 * Two thumbs make a range. Use `matSliderStartThumb` and `matSliderEndThumb`
 * instead of `matSliderThumb`; the thumbs cannot cross.
 */
export const RangeSlider: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-slider-range /></div>` }),
};

/** `formControlName` goes on the thumb input, not on `<mat-slider>`. */
export const InReactiveForms: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-slider-form /></div>` }),
};
