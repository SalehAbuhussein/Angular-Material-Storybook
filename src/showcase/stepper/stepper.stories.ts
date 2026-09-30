import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { LinearStepper } from './linear-stepper/linear-stepper.component';
import { StepperFlow } from './stepper-flow/stepper-flow.component';

/**
 * `<mat-stepper>` walks someone through a task one step at a time. Each
 * `<mat-step>` holds its own content, and `matStepperNext` / `matStepperPrevious`
 * move between them without any code in your component.
 */
const meta: Meta = {
  title: 'Navigation/Stepper',
  decorators: [
    moduleMetadata({
      imports: [MatStepperModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/**
 * `orientation` switches the whole layout. `labelPosition` and `headerPosition`
 * only do something while the stepper is horizontal.
 */
export const Playground: Story = {
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    labelPosition: {
      control: 'inline-radio',
      options: ['bottom', 'end'],
      description: 'Horizontal orientation only.',
    },
    headerPosition: {
      control: 'inline-radio',
      options: ['top', 'bottom'],
      description: 'Horizontal orientation only.',
    },
    linear: { control: 'boolean', description: 'Block a step until the previous one is complete.' },
  },
  args: { orientation: 'horizontal', labelPosition: 'end', headerPosition: 'top', linear: false },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-surface" style="width: 560px; padding: 16px">
        <mat-stepper
          [orientation]="orientation"
          [labelPosition]="labelPosition"
          [headerPosition]="headerPosition"
          [linear]="linear"
        >
          <mat-step label="Cart" [completed]="true">
            <p style="font: var(--mat-sys-body-medium)">Two items, $48.00.</p>
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Address" [completed]="false">
            <p style="font: var(--mat-sys-body-medium)">Where should this go?</p>
            <button matButton matStepperPrevious>Back</button>
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Payment">
            <p style="font: var(--mat-sys-body-medium)">Card ending 4242.</p>
            <button matButton matStepperPrevious>Back</button>
          </mat-step>
        </mat-stepper>
      </div>`,
  }),
};

/**
 * Vertical steppers show the content under the label, which suits long forms and
 * narrow screens. It is the same component with one input changed.
 */
export const VerticalStepper: Story = {
  render: () => ({
    template: `
      <div class="docs-surface" style="width: 460px; padding: 16px">
        <mat-stepper orientation="vertical">
          <mat-step label="Install the CLI">
            <p style="font: var(--mat-sys-body-medium)">npm install -g &#64;angular/cli</p>
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Create the project">
            <p style="font: var(--mat-sys-body-medium)">ng new my-app</p>
            <button matButton matStepperPrevious>Back</button>
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Add Material">
            <p style="font: var(--mat-sys-body-medium)">ng add &#64;angular/material</p>
            <button matButton matStepperPrevious>Back</button>
          </mat-step>
        </mat-stepper>
      </div>`,
  }),
};

/**
 * `linear` plus `[stepControl]` is the whole validation story: the Next button
 * refuses to advance while the step's form group is invalid, and the header shows
 * an error state once the user has touched the step.
 */
export const LinearWithForms: Story = {
  decorators: [moduleMetadata({ imports: [LinearStepper] })],
  render: () => ({ template: `<demo-linear-stepper />` }),
};

/**
 * `editable="false"` locks a step once you leave it. `optional` marks a step the
 * user may skip in a linear stepper, and adds the "Optional" caption.
 */
export const EditableAndOptionalSteps: Story = {
  render: () => ({
    template: `
      <div class="docs-surface" style="width: 560px; padding: 16px">
        <mat-stepper linear>
          <mat-step label="Confirm identity" [editable]="false" [completed]="true">
            <p style="font: var(--mat-sys-body-medium)">Verified. You cannot come back to this step.</p>
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Referral code" optional [completed]="true">
            <p style="font: var(--mat-sys-body-medium)">Skip this if you do not have one.</p>
            <button matButton matStepperPrevious>Back</button>
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Finish">
            <p style="font: var(--mat-sys-body-medium)">All done.</p>
            <button matButton matStepperPrevious>Back</button>
          </mat-step>
        </mat-stepper>
      </div>`,
  }),
};

/**
 * Override a header icon with `<ng-template matStepperIcon="...">`. The names are
 * the step states: `number`, `edit`, `done` and `error`.
 */
export const CustomStepIcons: Story = {
  render: () => ({
    template: `
      <div class="docs-surface" style="width: 560px; padding: 16px">
        <mat-stepper orientation="vertical">
          <ng-template matStepperIcon="edit"><mat-icon>create</mat-icon></ng-template>
          <ng-template matStepperIcon="done"><mat-icon>check_circle</mat-icon></ng-template>
          <ng-template matStepperIcon="number" let-index="index">
            <mat-icon>{{ ['looks_one', 'looks_two', 'looks_3'][index] }}</mat-icon>
          </ng-template>

          <mat-step label="Pick a plan">
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Add your team">
            <button matButton matStepperPrevious>Back</button>
            <button matButton="filled" matStepperNext>Next</button>
          </mat-step>
          <mat-step label="Invite">
            <button matButton matStepperPrevious>Back</button>
          </mat-step>
        </mat-stepper>
      </div>`,
  }),
};

/**
 * A flow with no forms. `completed` is a signal you own, `next()` advances from
 * code, and `reset()` puts the stepper back to step zero.
 */
export const CompletingAFlow: Story = {
  decorators: [moduleMetadata({ imports: [StepperFlow] })],
  render: () => ({ template: `<demo-stepper-flow />` }),
};
