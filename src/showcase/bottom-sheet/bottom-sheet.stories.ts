import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { BottomSheetBasic } from './bottom-sheet-basic/bottom-sheet-basic.component';
import { BottomSheetLocked } from './bottom-sheet-locked/bottom-sheet-locked.component';
import { BottomSheetPlayground } from './bottom-sheet-playground/bottom-sheet-playground.component';
import { BottomSheetResult } from './bottom-sheet-result/bottom-sheet-result.component';

/**
 * `MatBottomSheet` slides a panel up from the bottom edge. It is the mobile
 * shape of "pick one of these actions", where a dialog would feel heavy.
 */
const meta: Meta = {
  title: 'Popups and Modals/Bottom Sheet',
  decorators: [
    moduleMetadata({
      imports: [
        MatBottomSheetModule,
        MatButtonModule,
        BottomSheetPlayground,
        BottomSheetBasic,
        BottomSheetResult,
        BottomSheetLocked,
      ],
    }),
  ],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

/** Open the sheet, pick an option, and watch the result come back. */
export const Playground: Story = {
  argTypes: {
    disableClose: { control: 'boolean', description: 'Blocks Escape and backdrop taps.' },
    hasBackdrop: { control: 'boolean', description: 'Whether the page behind is dimmed and blocked.' },
    ariaLabel: { control: 'text', description: 'Accessible name for the sheet.' },
  },
  args: { disableClose: false, hasBackdrop: true, ariaLabel: 'Share options' },
  render: (args) => ({
    props: args,
    template: `
      <docs-bottom-sheet-playground
        [disableClose]="disableClose"
        [hasBackdrop]="hasBackdrop"
        [ariaLabel]="ariaLabel" />`,
  }),
};

/** The smallest useful call. */
export const Basic: Story = {
  render: () => ({ template: `<docs-bottom-sheet-basic />` }),
};

/** Passing data in and getting a result out. */
export const DataAndResult: Story = {
  render: () => ({ template: `<docs-bottom-sheet-result />` }),
};

/** `disableClose` turns the sheet into a required choice. */
export const DisableClose: Story = {
  render: () => ({ template: `<docs-bottom-sheet-locked />` }),
};
