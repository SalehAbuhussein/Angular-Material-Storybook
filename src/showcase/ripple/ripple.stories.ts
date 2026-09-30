import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { RippleCard } from './ripple-card/ripple-card.component';
import { RippleManual } from './ripple-manual/ripple-manual.component';

/**
 * `matRipple` adds the Material press feedback to any element. Material's own
 * components already have it; this directive is for the components you write.
 */
const meta: Meta = {
  title: 'Buttons and Indicators/Ripple',
  decorators: [
    moduleMetadata({
      imports: [
        MatRippleModule,
        MatButtonModule,
        MatIconModule,
        RippleCard,
        RippleManual,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Click inside the box. `radius` of 0 means "reach the furthest corner". */
export const Playground: Story = {
  argTypes: {
    centered: { control: 'boolean' },
    unbounded: { control: 'boolean' },
    radius: { control: { type: 'number', min: 0, step: 10 } },
    color: { control: 'text', description: 'Any CSS color. Applied to the ripple element.' },
    disabled: { control: 'boolean' },
  },
  args: {
    centered: false,
    unbounded: false,
    radius: 0,
    color: 'color-mix(in srgb, var(--mat-sys-primary) 20%, transparent)',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div matRipple
           [matRippleCentered]="centered"
           [matRippleUnbounded]="unbounded"
           [matRippleRadius]="radius"
           [matRippleColor]="color"
           [matRippleDisabled]="disabled"
           style="width: 260px; height: 120px; display: grid; place-items: center;
                  border-radius: var(--mat-sys-corner-medium);
                  background: var(--mat-sys-surface-container); cursor: pointer;">
        Click anywhere in here
      </div>`,
  }),
};

/** By default the ripple starts where you clicked. `matRippleCentered` starts it in the middle. */
export const Centered: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <div matRipple style="width: 180px; height: 100px; display: grid; place-items: center;
                              border-radius: var(--mat-sys-corner-medium);
                              background: var(--mat-sys-surface-container); cursor: pointer;">
          from the click
        </div>
        <div matRipple matRippleCentered
             style="width: 180px; height: 100px; display: grid; place-items: center;
                    border-radius: var(--mat-sys-corner-medium);
                    background: var(--mat-sys-surface-container); cursor: pointer;">
          always centered
        </div>
      </div>`,
  }),
};

/**
 * `matRippleUnbounded` lets the circle grow past the element's edges, which is
 * how round controls such as icon buttons and checkboxes ripple.
 */
export const Unbounded: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 48px; padding: 32px;">
        <div matRipple matRippleCentered matRippleRadius="40"
             style="width: 40px; height: 40px; display: grid; place-items: center;
                    border-radius: 50%; background: var(--mat-sys-surface-container); cursor: pointer;">
          <mat-icon aria-hidden="true">favorite</mat-icon>
        </div>
        <div matRipple matRippleCentered matRippleUnbounded matRippleRadius="40"
             style="width: 40px; height: 40px; display: grid; place-items: center;
                    border-radius: 50%; background: var(--mat-sys-surface-container); cursor: pointer;">
          <mat-icon aria-hidden="true">favorite</mat-icon>
        </div>
      </div>`,
  }),
};

/** `matRippleColor` takes any CSS color and is applied to the ripple element directly. */
export const Color: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <div matRipple matRippleColor="color-mix(in srgb, var(--mat-sys-primary) 24%, transparent)"
             style="width: 160px; height: 90px; display: grid; place-items: center;
                    border-radius: var(--mat-sys-corner-medium);
                    background: var(--mat-sys-surface-container); cursor: pointer;">primary</div>
        <div matRipple matRippleColor="color-mix(in srgb, var(--mat-sys-error) 24%, transparent)"
             style="width: 160px; height: 90px; display: grid; place-items: center;
                    border-radius: var(--mat-sys-corner-medium);
                    background: var(--mat-sys-surface-container); cursor: pointer;">error</div>
      </div>`,
  }),
};

/** The realistic case: a clickable card you built yourself, ripple included. */
export const OnYourOwnComponent: Story = {
  render: () => ({ template: `<docs-ripple-card />` }),
};

/**
 * `matRippleDisabled` stops pointer ripples but leaves `launch()` working, so
 * you can fire one in response to something other than a click.
 */
export const LaunchFromCode: Story = {
  render: () => ({ template: `<docs-ripple-manual />` }),
};
