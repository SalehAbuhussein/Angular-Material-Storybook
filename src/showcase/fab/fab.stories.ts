import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

/**
 * A floating action button is the one action a screen is for. It lives in
 * `@angular/material/button` with the other buttons, but it is a different
 * directive: `matFab`, `matMiniFab`, or `matFab` plus the `extended` attribute.
 */
const meta: Meta = {
  title: 'Buttons and Indicators/FAB',
  decorators: [moduleMetadata({ imports: [MatButtonModule, MatIconModule] })],
};

export default meta;
type Story = StoryObj;

/** Switch `variant` to see the three shapes a FAB can take. */
export const Playground: Story = {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['fab', 'mini', 'extended'],
      description: 'Which FAB directive to render.',
    },
    disabled: { control: 'boolean' },
    label: { control: 'text', description: 'Text shown on the extended FAB only.' },
    icon: { control: 'text', description: 'Material Symbols ligature name.' },
  },
  args: { variant: 'fab', disabled: false, label: 'Compose', icon: 'edit' },
  render: (args) => ({
    props: args,
    template: `
      @if (variant === 'fab') {
        <button matFab [disabled]="disabled" [attr.aria-label]="label">
          <mat-icon>{{ icon }}</mat-icon>
        </button>
      } @else if (variant === 'mini') {
        <button matMiniFab [disabled]="disabled" [attr.aria-label]="label">
          <mat-icon>{{ icon }}</mat-icon>
        </button>
      } @else {
        <button matFab extended [disabled]="disabled">
          <mat-icon>{{ icon }}</mat-icon>
          {{ label }}
        </button>
      }`,
  }),
};

/** The three sizes. Regular for a page action, mini for a dense surface, extended when the action needs a word. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matFab aria-label="Add item"><mat-icon>add</mat-icon></button>
        <button matMiniFab aria-label="Add item"><mat-icon>add</mat-icon></button>
        <button matFab extended><mat-icon>add</mat-icon> Add item</button>
      </div>`,
  }),
};

/**
 * `extended` is a plain attribute on `matFab`, not a value of it. The label goes
 * next to the icon as normal projected content.
 */
export const Extended: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matFab extended><mat-icon>navigation</mat-icon> Start route</button>
        <a matFab extended href="https://material.angular.dev" target="_blank" rel="noreferrer">
          <mat-icon>open_in_new</mat-icon> Open docs
        </a>
      </div>`,
  }),
};

/**
 * A FAB is positioned by your own CSS, not by the directive. Pin it to the
 * bottom-right of a positioned container and keep it clear of the content.
 */
export const Positioning: Story = {
  parameters: { layout: 'fullscreen' },
  argTypes: {
    corner: {
      control: 'select',
      options: ['bottom-end', 'bottom-start', 'top-end', 'top-start'],
      description: 'Which corner of the positioned container the FAB anchors to.',
    },
    offset: {
      control: { type: 'range', min: 0, max: 48, step: 4 },
      description: 'Distance in pixels from both edges of that corner.',
    },
  },
  args: { corner: 'bottom-end', offset: 16 },
  render: (args) => {
    const corner = args['corner'] as string;
    const gap = `${args['offset']}px`;
    const auto = 'auto';
    return {
      props: {
        ...args,
        top: corner.startsWith('top') ? gap : auto,
        bottom: corner.startsWith('bottom') ? gap : auto,
        insetStart: corner.endsWith('start') ? gap : auto,
        insetEnd: corner.endsWith('end') ? gap : auto,
      },
      template: `
        <div class="docs-surface" style="position: relative; height: 320px; overflow: auto; padding: 16px;">
          <p>Scrollable content sits under the FAB.</p>
          <p>The container is <code>position: relative</code>, so the button anchors to it.</p>
          <p>In a real app the container is usually the router outlet wrapper or the page body.</p>
          <button matFab aria-label="New message"
                  style="position: absolute"
                  [style.top]="top"
                  [style.bottom]="bottom"
                  [style.inset-inline-start]="insetStart"
                  [style.inset-inline-end]="insetEnd">
            <mat-icon>add</mat-icon>
          </button>
        </div>`,
    };
  },
};

/** A mini FAB fits inside a toolbar row or a card footer where a full FAB would dominate. */
export const MiniInContext: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="background: var(--mat-sys-surface-container); border-radius: var(--mat-sys-corner-medium); padding: 12px 16px;">
        <span style="flex: 1;">Shared album</span>
        <button matMiniFab aria-label="Upload photo"><mat-icon>photo_camera</mat-icon></button>
        <button matMiniFab aria-label="Invite people"><mat-icon>person_add</mat-icon></button>
      </div>`,
  }),
};
