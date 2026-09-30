import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { LoadingIndicator } from './m3-loading-indicator.component';
import { WavyProgress } from './wavy-progress/wavy-progress.component';

const meta: Meta = {
  title: 'M3 Components/Loading Indicator',
  component: LoadingIndicator,
  // Only real inputs; otherwise Storybook also lists computed signals as free inputs.
  parameters: { controls: { include: ['size', 'contained', 'label', 'value'] } },
  decorators: [moduleMetadata({ imports: [LoadingIndicator, WavyProgress] })],
};

export default meta;
type Story = StoryObj;

/** The morphing indicator on its own. Try `contained` and a bigger size. */
export const Playground: Story = {
  argTypes: {
    size: { control: { type: 'range', min: 24, max: 240, step: 4 } },
    contained: { control: 'boolean' },
  },
  args: { size: 96, contained: false, label: 'Loading' },
};

/** Plain and contained, at the default 48px and larger. */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:32px; align-items:center">
        <m3-loading-indicator />
        <m3-loading-indicator [contained]="true" />
        <m3-loading-indicator [size]="120" />
        <m3-loading-indicator [size]="120" [contained]="true" />
      </div>`,
  }),
};

/** The wavy progress bar, determinate and indeterminate. Drag the value. */
export const WavyProgressBar: Story = {
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: { table: { disable: true } },
    contained: { table: { disable: true } },
  },
  args: { value: 60 },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; flex-direction:column; gap:32px; width:min(360px, 90vw)">
        <m3-wavy-progress [value]="value" label="Upload progress" />
        <m3-wavy-progress label="Loading" />
      </div>`,
  }),
};
