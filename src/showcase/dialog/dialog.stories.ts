import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ConfirmDemo } from './confirm-demo/confirm-demo.component';
import { DialogConfigDemo } from './dialog-config-demo/dialog-config-demo.component';
import { DialogPlayground } from './dialog-playground/dialog-playground.component';
import { FormDialogDemo } from './form-dialog-demo/form-dialog-demo.component';

/**
 * `MatDialog` is a service, not a component. You call `dialog.open(SomeComponent)`
 * and Angular Material renders that component in a CDK overlay above the page.
 */
const meta: Meta = {
  title: 'Popups and Modals/Dialog',
  decorators: [
    moduleMetadata({
      imports: [
        MatDialogModule,
        MatButtonModule,
        DialogPlayground,
        ConfirmDemo,
        FormDialogDemo,
        DialogConfigDemo,
      ],
    }),
  ],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

/**
 * Open the dialog, then change `width`, `disableClose` and `autoFocus` in the
 * controls and open it again. The result printed below comes from `afterClosed()`.
 */
export const Playground: Story = {
  argTypes: {
    width: { control: 'text', description: 'CSS width passed to `MatDialogConfig.width`.' },
    disableClose: {
      control: 'boolean',
      description: 'Blocks Escape and backdrop clicks. Use it only when you supply your own close button.',
    },
    autoFocus: {
      control: 'inline-radio',
      options: ['first-tabbable', 'dialog', 'first-heading'],
      description: 'Where focus lands when the dialog opens.',
    },
  },
  args: { width: '420px', disableClose: false, autoFocus: 'first-tabbable' },
  render: (args) => ({
    props: args,
    template: `<docs-dialog-playground [width]="width" [disableClose]="disableClose" [autoFocus]="autoFocus" />`,
  }),
};

/**
 * One confirm dialog reused everywhere. Data goes in through `MAT_DIALOG_DATA`,
 * the answer comes back as a boolean from `afterClosed()`.
 */
export const ConfirmDialogStory: Story = {
  name: 'Confirm dialog',
  render: () => ({ template: `<docs-confirm-demo />` }),
};

/** A reactive form inside the dialog. The submit handler closes with the form value. */
export const FormInDialog: Story = {
  render: () => ({ template: `<docs-form-dialog-demo />` }),
};

/** The three config options you will reach for first. */
export const Configuration: Story = {
  render: () => ({ template: `<docs-dialog-config-demo />` }),
};
