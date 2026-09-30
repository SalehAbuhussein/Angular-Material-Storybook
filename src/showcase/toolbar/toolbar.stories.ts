import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { PALETTES } from './toolbar.constants';

/**
 * `<mat-toolbar>` is a styled bar and nothing else. It gives you height,
 * padding, typography and a background, then gets out of the way. Layout inside
 * it is your own flexbox.
 */
const meta: Meta = {
  title: 'Navigation/Toolbar',
  decorators: [moduleMetadata({ imports: [MatToolbarModule, MatButtonModule, MatIconModule] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Toggle `multiRow` to see the two shapes a toolbar can take, and `palette` to
 * see colour applied the Material 3 way: with theme tokens, not a `color` input.
 */
export const Playground: Story = {
  argTypes: {
    palette: {
      control: 'inline-radio',
      options: ['surface', 'primary', 'tertiary'],
      description: 'Which theme token pair paints the bar. M3 ignores `color`.',
    },
    multiRow: { control: 'boolean', description: 'Split the bar into two `<mat-toolbar-row>` elements.' },
    label: { control: 'text' },
  },
  args: { palette: 'primary', multiRow: false, label: 'Reports' },
  render: (args) => {
    const [bg, fg] = PALETTES[args['palette'] as string];
    return {
      props: { ...args, bg: `var(${bg})`, fg: `var(${fg})` },
      template: `
        <div style="height: 240px">
          @if (multiRow) {
            <mat-toolbar [style.background]="bg" [style.color]="fg">
              <mat-toolbar-row>{{ label }}</mat-toolbar-row>
              <mat-toolbar-row>
                <span style="font: var(--mat-sys-body-medium)">Updated 3 minutes ago</span>
              </mat-toolbar-row>
            </mat-toolbar>
          } @else {
            <mat-toolbar [style.background]="bg" [style.color]="fg">{{ label }}</mat-toolbar>
          }
        </div>`,
    };
  },
};

/** A bare toolbar. Text goes straight in as content; no wrapper needed. */
export const SingleRow: Story = {
  render: () => ({
    template: `
      <div style="height: 160px">
        <mat-toolbar>Settings</mat-toolbar>
      </div>`,
  }),
};

/**
 * Add `<mat-toolbar-row>` children to stack rows. It is all or nothing: mixing
 * loose content with rows throws at runtime.
 */
export const MultipleRows: Story = {
  render: () => ({
    template: `
      <div style="height: 240px">
        <mat-toolbar style="background: var(--mat-sys-surface-container); color: var(--mat-sys-on-surface)">
          <mat-toolbar-row>Invoices</mat-toolbar-row>
          <mat-toolbar-row>
            <span style="font: var(--mat-sys-body-medium)">42 open</span>
            <span style="flex: 1 1 auto"></span>
            <span style="font: var(--mat-sys-body-medium)">$12,400 outstanding</span>
          </mat-toolbar-row>
        </mat-toolbar>
      </div>`,
  }),
};

/**
 * The layout you will actually ship: menu button, title, a flexible spacer, then
 * trailing actions. The spacer is a plain `<span>` with `flex: 1 1 auto`.
 */
export const AppBar: Story = {
  render: () => ({
    template: `
      <div style="height: 260px">
        <mat-toolbar style="background: var(--mat-sys-primary-container); color: var(--mat-sys-on-primary-container)">
          <button matIconButton aria-label="Open navigation"><mat-icon>menu</mat-icon></button>
          <span style="margin-inline-start: 8px">Acme Console</span>
          <span style="flex: 1 1 auto"></span>
          <button matIconButton aria-label="Search"><mat-icon>search</mat-icon></button>
          <button matIconButton aria-label="Notifications"><mat-icon>notifications</mat-icon></button>
          <button matIconButton aria-label="Account"><mat-icon>account_circle</mat-icon></button>
        </mat-toolbar>
        <div style="padding: 16px; font: var(--mat-sys-body-medium)">Page content sits under the bar.</div>
      </div>`,
  }),
};

/**
 * `color="primary"` does nothing in a Material 3 theme. Paint the bar with the
 * system tokens instead, and it follows light and dark mode for free.
 */
export const ColorFromThemeTokens: Story = {
  render: () => ({
    template: `
      <div style="height: 300px">
        <mat-toolbar style="background: var(--mat-sys-surface-container); color: var(--mat-sys-on-surface)">Surface container</mat-toolbar>
        <mat-toolbar style="background: var(--mat-sys-primary-container); color: var(--mat-sys-on-primary-container)">Primary container</mat-toolbar>
        <mat-toolbar style="background: var(--mat-sys-tertiary-container); color: var(--mat-sys-on-tertiary-container)">Tertiary container</mat-toolbar>
      </div>`,
  }),
};
