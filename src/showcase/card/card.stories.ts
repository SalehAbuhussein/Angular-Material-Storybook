import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

/** A small inline SVG so the examples never depend on the network. */
const PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6750a4"/><stop offset="1" stop-color="#7d5260"/>
      </linearGradient></defs>
      <rect width="400" height="220" fill="url(#g)"/>
      <circle cx="310" cy="60" r="34" fill="#ffffff" opacity="0.28"/>
    </svg>`,
  );

/**
 * `MatCard` is a container with no behaviour of its own. It gives you a surface,
 * elevation and the slots (`mat-card-header`, `mat-card-content`,
 * `mat-card-actions`) that keep padding consistent between cards.
 */
const meta: Meta = {
  title: 'Layout/Card',
  decorators: [
    moduleMetadata({
      imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Swap `appearance` to see the three surfaces on identical markup. */
export const Playground: Story = {
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['raised', 'outlined', 'filled'],
      description: 'Surface treatment. `raised` is the default.',
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    body: { control: 'text' },
  },
  args: {
    appearance: 'raised',
    title: 'Weekly report',
    subtitle: 'Updated 5 minutes ago',
    body: 'Sessions are up 12% week over week. Checkout conversion is flat.',
  },
  render: (args) => ({
    props: args,
    template: `
      <mat-card [appearance]="appearance" style="max-width: 360px">
        <mat-card-header>
          <mat-card-title>{{ title }}</mat-card-title>
          <mat-card-subtitle>{{ subtitle }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>{{ body }}</mat-card-content>
        <mat-card-actions align="end">
          <button matButton>Dismiss</button>
          <button matButton="filled">Open</button>
        </mat-card-actions>
      </mat-card>`,
  }),
};

/**
 * Every slot at once, in the order Angular Material expects: header, image,
 * content, actions, footer.
 */
export const Anatomy: Story = {
  render: () => ({
    props: { photo: PHOTO },
    template: `
      <mat-card style="max-width: 360px">
        <mat-card-header>
          <div mat-card-avatar style="background: var(--mat-sys-primary-container); border-radius: 50%"></div>
          <mat-card-title>Shrimp and chorizo paella</mat-card-title>
          <mat-card-subtitle>Spanish, 45 minutes</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-image [src]="photo" alt="" />
        <mat-card-content>
          Heat the oil in a wide pan over medium-high heat, then add the chorizo
          and cook until browned.
        </mat-card-content>
        <mat-card-actions>
          <button matButton>Share</button>
          <button matButton>Save</button>
        </mat-card-actions>
        <mat-card-footer style="padding: 8px 16px; color: var(--mat-sys-on-surface-variant)">
          <small>Added by Dana</small>
        </mat-card-footer>
      </mat-card>`,
  }),
};

/**
 * `outlined` uses a border instead of a shadow. Reach for it when cards sit on a
 * tinted surface where a shadow would read as noise.
 */
export const Appearances: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="align-items: stretch">
        <mat-card appearance="raised" style="width: 220px">
          <mat-card-header><mat-card-title>Raised</mat-card-title></mat-card-header>
          <mat-card-content>The default. A shadow lifts the card off the page.</mat-card-content>
        </mat-card>
        <mat-card appearance="outlined" style="width: 220px">
          <mat-card-header><mat-card-title>Outlined</mat-card-title></mat-card-header>
          <mat-card-content>A one pixel border, no shadow. Quiet in a dense grid.</mat-card-content>
        </mat-card>
        <mat-card appearance="filled" style="width: 220px">
          <mat-card-header><mat-card-title>Filled</mat-card-title></mat-card-header>
          <mat-card-content>A tinted surface with no border and no shadow.</mat-card-content>
        </mat-card>
      </div>`,
  }),
};

/**
 * `mat-card-title-group` puts the title block and a small image on one row. Use
 * it when the image is a thumbnail rather than a hero.
 */
export const TitleGroup: Story = {
  render: () => ({
    props: { photo: PHOTO },
    template: `
      <mat-card style="max-width: 380px">
        <mat-card-title-group>
          <mat-card-title>Night drive</mat-card-title>
          <mat-card-subtitle>The Midnight</mat-card-subtitle>
          <img mat-card-sm-image [src]="photo" alt="" />
        </mat-card-title-group>
        <mat-card-content>Synthwave, 2017. Four minutes twelve.</mat-card-content>
        <mat-card-actions>
          <button matIconButton aria-label="Play"><mat-icon>play_arrow</mat-icon></button>
          <button matIconButton aria-label="Add to library"><mat-icon>library_add</mat-icon></button>
        </mat-card-actions>
      </mat-card>`,
  }),
};

/**
 * A real product card. Note the single heading element: the card is not a
 * landmark, so the semantics have to come from the content you put inside it.
 */
export const ProductCard: Story = {
  render: () => ({
    props: { photo: PHOTO },
    template: `
      <mat-card appearance="outlined" style="max-width: 320px">
        <img mat-card-image [src]="photo" alt="Aeron office chair, side view" />
        <mat-card-content>
          <h3 style="margin: 0 0 4px; font: var(--mat-sys-title-medium)">Aeron chair</h3>
          <p style="margin: 0 0 8px; color: var(--mat-sys-on-surface-variant)">
            Size B, graphite frame
          </p>
          <p style="margin: 0; font: var(--mat-sys-title-large)">$1,395</p>
          <p style="margin: 4px 0 0; color: var(--mat-sys-tertiary)">In stock, ships Monday</p>
        </mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions align="end">
          <button matButton>Compare</button>
          <button matButton="filled"><mat-icon>add_shopping_cart</mat-icon> Add to cart</button>
        </mat-card-actions>
      </mat-card>`,
  }),
};
