import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

// Aliased because the story export below is also called OverMode.
import { OverMode as OverModeComponent } from './over-mode/over-mode.component';
import { ResponsiveNav } from './responsive-nav/responsive-nav.component';

/**
 * A sidenav is three elements that must appear together:
 * `<mat-sidenav-container>` wrapping a `<mat-sidenav>` and a
 * `<mat-sidenav-content>`. The container owns the layout, the backdrop and the
 * scroll behaviour.
 */
const meta: Meta = {
  title: 'Navigation/Sidenav',
  decorators: [
    moduleMetadata({
      imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule],
    }),
  ],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const NAV_LINKS = `
  <mat-nav-list>
    <a mat-list-item href="#"><mat-icon matListItemIcon>dashboard</mat-icon><span matListItemTitle>Dashboard</span></a>
    <a mat-list-item href="#"><mat-icon matListItemIcon>receipt_long</mat-icon><span matListItemTitle>Invoices</span></a>
    <a mat-list-item href="#"><mat-icon matListItemIcon>group</mat-icon><span matListItemTitle>Customers</span></a>
  </mat-nav-list>`;

/**
 * Switch `mode` between `over`, `push` and `side` and watch what happens to the
 * content: `over` floats on top of it, `push` shoves it sideways, `side` shares
 * the row with it.
 */
export const Playground: Story = {
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['over', 'push', 'side'],
      description: 'How the drawer relates to the content it sits next to.',
    },
    position: { control: 'inline-radio', options: ['start', 'end'] },
    opened: { control: 'boolean' },
    disableClose: { control: 'boolean', description: 'Block escape and backdrop clicks.' },
  },
  args: { mode: 'side', position: 'start', opened: true, disableClose: false },
  render: (args) => ({
    props: args,
    template: `
      <mat-sidenav-container style="height: 400px">
        <mat-sidenav [mode]="mode" [position]="position" [opened]="opened"
                     [disableClose]="disableClose" style="width: 220px">
          ${NAV_LINKS}
        </mat-sidenav>
        <mat-sidenav-content style="padding: 16px; font: var(--mat-sys-body-medium)">
          <p>Main content. In <code>side</code> mode it gets narrower; in <code>push</code> mode it slides.</p>
        </mat-sidenav-content>
      </mat-sidenav-container>`,
  }),
};

/**
 * `side` is the desktop layout: the drawer is part of the page, there is no
 * backdrop, and clicking the content does not close it.
 */
export const SideMode: Story = {
  render: () => ({
    template: `
      <mat-sidenav-container style="height: 360px">
        <mat-sidenav mode="side" opened style="width: 220px">${NAV_LINKS}</mat-sidenav>
        <mat-sidenav-content style="padding: 16px; font: var(--mat-sys-body-medium)">
          The drawer and the content share the width. Nothing overlaps.
        </mat-sidenav-content>
      </mat-sidenav-container>`,
  }),
};

/**
 * `over` is the phone layout: the drawer floats above the content on a backdrop,
 * and Escape or a backdrop click closes it. Drive it from a template reference
 * variable, not from a boolean you keep in sync by hand.
 */
export const OverMode: Story = {
  decorators: [moduleMetadata({ imports: [OverModeComponent] })],
  render: () => ({ template: `<demo-over-mode />` }),
};

/**
 * `fixedInViewport` pins the drawer to the viewport instead of the container.
 * Pair it with `fixedTopGap` so it starts below a fixed toolbar.
 */
export const FixedInViewport: Story = {
  render: () => ({
    template: `
      <mat-sidenav-container style="height: 400px">
        <mat-sidenav mode="side" opened fixedInViewport [fixedTopGap]="64" style="width: 220px">
          ${NAV_LINKS}
        </mat-sidenav>
        <mat-sidenav-content style="font: var(--mat-sys-body-medium)">
          <mat-toolbar style="background: var(--mat-sys-primary-container); color: var(--mat-sys-on-primary-container)">
            Fixed 64px toolbar
          </mat-toolbar>
          <div style="padding: 16px">The drawer is positioned against the viewport, offset by the toolbar height.</div>
        </mat-sidenav-content>
      </mat-sidenav-container>`,
  }),
};

/**
 * `mat-drawer` is the same component with no app-shell styling: no elevation
 * tuning, no `fixedInViewport`. Use it for a panel inside a page.
 */
export const DrawerInsteadOfSidenav: Story = {
  render: () => ({
    template: `
      <div class="docs-surface" style="padding: 16px">
        <mat-drawer-container style="height: 300px; border-radius: var(--mat-sys-corner-medium)">
          <mat-drawer #filters mode="side" opened position="end" style="width: 200px; padding: 16px">
            <div style="font: var(--mat-sys-title-small)">Filters</div>
          </mat-drawer>
          <mat-drawer-content style="padding: 16px; font: var(--mat-sys-body-medium)">
            <button matButton="outlined" (click)="filters.toggle()">Toggle filters</button>
            <p>A drawer panel inside a page, not an app shell.</p>
          </mat-drawer-content>
        </mat-drawer-container>
      </div>`,
  }),
};

/**
 * The pattern every app ends up writing: `BreakpointObserver` decides the mode
 * and the initial open state, and the menu button only appears on small screens.
 */
export const ResponsivePattern: Story = {
  decorators: [moduleMetadata({ imports: [ResponsiveNav] })],
  render: () => ({ template: `<demo-responsive-nav />` }),
};
