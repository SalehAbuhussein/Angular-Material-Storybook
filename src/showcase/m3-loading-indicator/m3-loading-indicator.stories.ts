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

/**
 * The wavy progress bar, determinate and indeterminate. Drag the value: the
 * fill glides to it. The other controls reshape the wave.
 */
export const WavyProgressBar: Story = {
  parameters: { controls: { include: ['value', 'amplitude', 'wavelength', 'thickness', 'speed'] } },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    amplitude: { control: { type: 'range', min: 0, max: 8, step: 0.5 } },
    wavelength: { control: { type: 'range', min: 16, max: 80, step: 2 } },
    thickness: { control: { type: 'range', min: 2, max: 8, step: 1 } },
    speed: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
  },
  args: { value: 60, amplitude: 3, wavelength: 40, thickness: 4, speed: 0.8 },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; flex-direction:column; gap:32px; width:min(360px, 90vw)">
        <m3-wavy-progress [value]="value" [amplitude]="amplitude" [wavelength]="wavelength"
          [thickness]="thickness" [speed]="speed" label="Upload progress" />
        <m3-wavy-progress [amplitude]="amplitude" [wavelength]="wavelength"
          [thickness]="thickness" [speed]="speed" label="Loading" />
      </div>`,
  }),
};

/** Recoloured through its two CSS variables, and a taller, slower wave. */
export const WavyProgressCustom: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:32px; width:min(480px, 90vw)">
        <m3-wavy-progress [value]="72" [amplitude]="5" [wavelength]="56" [thickness]="6" [speed]="0.5"
          label="Tertiary upload"
          style="--m3-wavy-progress-indicator-color: var(--mat-sys-tertiary);
                 --m3-wavy-progress-track-color: var(--mat-sys-tertiary-container)" />
        <m3-wavy-progress [amplitude]="2" [wavelength]="28" [thickness]="3" label="Subtle loading" />
      </div>`,
  }),
};
