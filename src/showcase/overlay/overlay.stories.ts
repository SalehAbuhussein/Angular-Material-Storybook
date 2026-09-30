import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { OverlayImperative } from './overlay-imperative/overlay-imperative.component';
import { OverlayPlayground } from './overlay-playground/overlay-playground.component';
import { OverlayPopover } from './overlay-popover/overlay-popover.component';
import { OverlayPositions } from './overlay-positions/overlay-positions.component';
import { OverlayScroll } from './overlay-scroll/overlay-scroll.component';

/**
 * The CDK Overlay is the layer that dialogs, snackbars, bottom sheets, menus,
 * selects and tooltips are all built on. Use it directly when you need a
 * floating panel that Angular Material does not already give you.
 */
const meta: Meta = {
  title: 'Popups and Modals/CDK Overlay',
  decorators: [
    moduleMetadata({
      imports: [
        OverlayModule,
        MatButtonModule,
        OverlayPlayground,
        OverlayPopover,
        OverlayPositions,
        OverlayScroll,
        OverlayImperative,
      ],
    }),
  ],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

/** A dropdown built from `cdkOverlayOrigin` plus `cdkConnectedOverlay`. */
export const Playground: Story = {
  argTypes: {
    position: {
      control: 'inline-radio',
      options: ['below', 'below end', 'above', 'side'],
      description: 'Which `ConnectedPosition[]` is passed to `cdkConnectedOverlayPositions`.',
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'A transparent backdrop is how you catch the click that closes the panel.',
    },
    width: { control: 'number', description: 'Panel width in pixels.' },
  },
  args: { position: 'below', hasBackdrop: true, width: 220 },
  render: (args) => ({
    props: args,
    template: `<docs-overlay-playground [position]="position" [hasBackdrop]="hasBackdrop" [width]="width" />`,
  }),
};

/** The smallest connected overlay that behaves correctly. */
export const Popover: Story = {
  render: () => ({ template: `<docs-overlay-popover />` }),
};

/** Fallback positions let the panel flip when it would leave the viewport. */
export const Positions: Story = {
  render: () => ({ template: `<docs-overlay-positions />` }),
};

/** What happens to an open overlay when the page scrolls. */
export const ScrollStrategies: Story = {
  render: () => ({ template: `<docs-overlay-scroll />` }),
};

/** `createOverlayRef` for the cases where a template directive does not fit. */
export const Imperative: Story = {
  render: () => ({ template: `<docs-overlay-imperative />` }),
};
