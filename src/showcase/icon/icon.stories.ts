import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { IconSvg } from './icon-svg/icon-svg.component';

/**
 * `<mat-icon>` renders a font ligature by default. The Material Symbols font is
 * already loaded in this app, so the text inside the element is the icon name.
 */
const meta: Meta = {
  title: 'Buttons and Indicators/Icon',
  decorators: [
    moduleMetadata({ imports: [MatIconModule, MatButtonModule, IconSvg] }),
  ],
};

export default meta;
type Story = StoryObj;

/** Type any Material Symbols name into `name` and it renders. */
export const Playground: Story = {
  argTypes: {
    name: { control: 'text', description: 'Material Symbols ligature name.' },
    inline: { control: 'boolean', description: 'Sizes the icon to the surrounding font size.' },
    size: { control: { type: 'range', min: 16, max: 72, step: 4 }, description: 'CSS font-size in px.' },
  },
  args: { name: 'favorite', inline: false, size: 24 },
  render: (args) => ({
    props: args,
    template: `
      <mat-icon [inline]="inline" aria-hidden="true"
                [style.font-size.px]="size" [style.width.px]="size" [style.height.px]="size">
        {{ name }}
      </mat-icon>`,
  }),
};

/** The icon name is the element's text content. Nothing else is needed. */
export const Ligatures: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <mat-icon aria-hidden="true">home</mat-icon>
        <mat-icon aria-hidden="true">search</mat-icon>
        <mat-icon aria-hidden="true">expand_more</mat-icon>
        <mat-icon aria-hidden="true">delete</mat-icon>
        <mat-icon fontIcon="settings" aria-hidden="true"></mat-icon>
      </div>`,
  }),
};

/**
 * Size is font size. Set all three of `font-size`, `width`, and `height` so the
 * box around the glyph matches the glyph.
 */
export const Sizing: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <mat-icon aria-hidden="true" style="font-size: 18px; width: 18px; height: 18px;">star</mat-icon>
        <mat-icon aria-hidden="true">star</mat-icon>
        <mat-icon aria-hidden="true" style="font-size: 40px; width: 40px; height: 40px;">star</mat-icon>
        <mat-icon aria-hidden="true" style="font-size: 64px; width: 64px; height: 64px;">star</mat-icon>
      </div>`,
  }),
};

/** `inline` makes the icon take the font size and baseline of the text around it. */
export const Inline: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <p style="font-size: 14px;">
          Press <mat-icon inline aria-hidden="true">save</mat-icon> to keep your changes.
        </p>
        <p style="font-size: 28px;">
          Press <mat-icon inline aria-hidden="true">save</mat-icon> to keep your changes.
        </p>
        <p style="font-size: 14px;">
          Without inline: <mat-icon aria-hidden="true">save</mat-icon> the icon stays 24px.
        </p>
      </div>`,
  }),
};

/** Icons inherit `currentColor`, so a CSS `color` on the icon or its parent tints it. */
export const Coloring: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <mat-icon aria-hidden="true" style="color: var(--mat-sys-primary)">palette</mat-icon>
        <mat-icon aria-hidden="true" style="color: var(--mat-sys-error)">error</mat-icon>
        <mat-icon aria-hidden="true" style="color: var(--mat-sys-tertiary)">eco</mat-icon>
        <span style="color: var(--mat-sys-primary)">
          <mat-icon inline aria-hidden="true">link</mat-icon> inherited from the parent
        </span>
      </div>`,
  }),
};

/** SVG icons registered through `MatIconRegistry` are rendered by `svgIcon` name. */
export const SvgIcons: Story = {
  render: () => ({ template: `<docs-icon-svg />` }),
};

/**
 * A decorative icon gets `aria-hidden="true"`. An icon that is the only content
 * of a control gets its name from the control's `aria-label`.
 */
export const Accessibility: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row">
        <button matButton="filled"><mat-icon aria-hidden="true">download</mat-icon> Download</button>
        <button matIconButton aria-label="Delete file"><mat-icon>delete</mat-icon></button>
        <span><mat-icon aria-hidden="true">schedule</mat-icon> Updated 5 minutes ago</span>
      </div>`,
  }),
};
