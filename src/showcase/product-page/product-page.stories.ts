import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { ProductPage } from './product-page.component';

const meta: Meta = {
  title: 'Full Layouts/Product Page',
  decorators: [moduleMetadata({ imports: [ProductPage] })],
  // The canvas code would only be the device frame; the docs page shows the
  // component's real files in tabs instead.
  parameters: { layout: 'fullscreen', docs: { canvas: { sourceState: 'none' } } },
};

export default meta;
type Story = StoryObj;

/** Wraps the page in a device-shaped frame of a fixed size. */
const frame = (width: number, height: number, inner: string) => `
  <div style="display:flex; justify-content:center; padding:32px 16px">
    <div style="width:${width}px; max-width:100%; height:${height}px; overflow:hidden;
      border-radius:32px; border:6px solid var(--mat-sys-surface-container-highest);
      box-shadow: var(--mat-sys-level2)">${inner}</div>
  </div>`;

/**
 * Drag the width control across 720px and the layout switches from the phone
 * arrangement to the tablet one. Pick a size and a color, then add it to the
 * basket: the floating pill updates, and the snackbar can undo it.
 */
export const Playground: Story = {
  argTypes: {
    width: { control: { type: 'range', min: 360, max: 1200, step: 10 } },
    height: { control: { type: 'range', min: 560, max: 900, step: 10 } },
    showReviews: { control: 'boolean', description: 'Open the reviews panel on load.' },
  },
  args: { width: 412, height: 800, showReviews: false },
  render: (args) => ({
    props: args,
    template: frame(args['width'], args['height'], `<demo-product-page [showReviews]="showReviews" />`),
  }),
};

/** The compact layout: top bar, swipeable gallery, bottom navigation bar. */
export const Phone: Story = {
  render: () => ({ template: frame(412, 820, `<demo-product-page />`) }),
};

/** The medium layout: navigation rail, gallery and details in two columns. */
export const Tablet: Story = {
  render: () => ({ template: frame(900, 700, `<demo-product-page [showReviews]="true" />`) }),
};

/** A desktop window: the same two columns with more room, and all three photo sizes in view. */
export const Desktop: Story = {
  render: () => ({ template: frame(1280, 800, `<demo-product-page [showReviews]="true" />`) }),
};
