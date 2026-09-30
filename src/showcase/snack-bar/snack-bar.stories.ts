import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { SnackBarBasics } from './snack-bar-basics/snack-bar-basics.component';
import { SnackBarCustom } from './snack-bar-custom/snack-bar-custom.component';
import { SnackBarPlayground } from './snack-bar-playground/snack-bar-playground.component';
import { SnackBarPosition } from './snack-bar-position/snack-bar-position.component';
import { SnackBarStacking } from './snack-bar-stacking/snack-bar-stacking.component';

/**
 * `MatSnackBar` is a service that shows one short message at the edge of the
 * screen. It never blocks the page and it never asks a question.
 */
const meta: Meta = {
  title: 'Popups and Modals/Snack Bar',
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        MatButtonModule,
        SnackBarPlayground,
        SnackBarBasics,
        SnackBarPosition,
        SnackBarCustom,
        SnackBarStacking,
      ],
    }),
  ],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

/** Change the controls, then open the snackbar again to see the effect. */
export const Playground: Story = {
  argTypes: {
    message: { control: 'text' },
    action: { control: 'text', description: 'Label of the single action button. Empty means no button.' },
    duration: { control: { type: 'number', min: 0, step: 500 }, description: 'Milliseconds before auto dismiss. 0 means never.' },
    horizontalPosition: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    verticalPosition: { control: 'inline-radio', options: ['top', 'bottom'] },
  },
  args: {
    message: 'Draft saved',
    action: 'Undo',
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  },
  render: (args) => ({
    props: args,
    template: `
      <docs-snack-bar-playground
        [message]="message"
        [action]="action"
        [duration]="duration"
        [horizontalPosition]="horizontalPosition"
        [verticalPosition]="verticalPosition" />`,
  }),
};

/** The two shapes a text snackbar comes in. */
export const MessageAndAction: Story = {
  render: () => ({ template: `<docs-snack-bar-basics />` }),
};

/** Position is set per call, not globally. */
export const Position: Story = {
  render: () => ({ template: `<docs-snack-bar-position />` }),
};

/** `openFromComponent` when a string is not enough. */
export const CustomComponent: Story = {
  render: () => ({ template: `<docs-snack-bar-custom />` }),
};

/** Snackbars do not stack. Each call replaces the one before it. */
export const NoStacking: Story = {
  render: () => ({ template: `<docs-snack-bar-stacking />` }),
};
