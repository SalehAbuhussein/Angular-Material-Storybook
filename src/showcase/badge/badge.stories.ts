import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { BadgeLive } from './badge-live/badge-live.component';

/**
 * `MatBadge` is a directive, not an element. You put `matBadge` on the thing the
 * count belongs to and the directive renders the little bubble for you.
 */
const meta: Meta = {
  title: 'Buttons and Indicators/Badge',
  decorators: [
    moduleMetadata({
      imports: [MatBadgeModule, MatButtonModule, MatIconModule, BadgeLive],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Every badge input in one place. Watch `position` and `overlap` move the bubble. */
export const Playground: Story = {
  argTypes: {
    content: { control: 'text', description: 'Value of `matBadge`.' },
    position: {
      control: 'select',
      options: [
        'above after',
        'above before',
        'below after',
        'below before',
        'above',
        'below',
        'before',
        'after',
      ],
    },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    overlap: { control: 'boolean' },
    hidden: { control: 'boolean' },
  },
  args: {
    content: '8',
    position: 'above after',
    size: 'medium',
    overlap: true,
    hidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <button matIconButton aria-label="Open notifications"
              [matBadge]="content"
              [matBadgePosition]="position"
              [matBadgeSize]="size"
              [matBadgeOverlap]="overlap"
              [matBadgeHidden]="hidden"
              matBadgeDescription="Unread notifications">
        <mat-icon>notifications</mat-icon>
      </button>`,
  }),
};

/** The badge attaches to whatever element carries the directive: an icon, a word, a button. */
export const OnDifferentHosts: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 32px;">
        <button matIconButton aria-label="Open inbox" matBadge="4" matBadgeDescription="4 unread messages">
          <mat-icon>inbox</mat-icon>
        </button>
        <span matBadge="New" matBadgeOverlap="false" matBadgeSize="small">Releases</span>
        <button matButton="filled" matBadge="12" matBadgeOverlap="false" matBadgeDescription="12 items in cart">
          Checkout
        </button>
      </div>`,
  }),
};

/**
 * `matBadgePosition` takes one vertical word, one horizontal word, or both.
 * `matBadgeOverlap="false"` pushes the badge outside the host instead of over it.
 */
export const PositionAndOverlap: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 32px;">
        <span matBadge="1" matBadgePosition="above after">above after</span>
        <span matBadge="2" matBadgePosition="above before">above before</span>
        <span matBadge="3" matBadgePosition="below after">below after</span>
        <span matBadge="4" matBadgePosition="below before">below before</span>
        <span matBadge="5" matBadgeOverlap="false">overlap false</span>
      </div>`,
  }),
};

/** Three sizes. `small` suits inline text, `large` suits a big touch target. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="gap: 32px;">
        <span matBadge="7" matBadgeSize="small">Small</span>
        <span matBadge="7" matBadgeSize="medium">Medium</span>
        <span matBadge="7" matBadgeSize="large">Large</span>
      </div>`,
  }),
};

/**
 * Bind `matBadgeHidden` to a signal so the bubble disappears at zero instead of
 * showing a meaningless "0".
 */
export const HiddenWhenEmpty: Story = {
  render: () => ({ template: `<docs-badge-live />` }),
};
