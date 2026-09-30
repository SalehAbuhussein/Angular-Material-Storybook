import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { DynamicTabs as DynamicTabsComponent } from './dynamic-tabs/dynamic-tabs.component';
import { LazyTabs } from './lazy-tabs/lazy-tabs.component';

/**
 * `<mat-tab-group>` owns both the header and the bodies. Each `<mat-tab>` is a
 * label plus the content that belongs to it. Use it when the panels are part of
 * one page; use `mat-tab-nav-bar` when each tab is a route.
 */
const meta: Meta = {
  title: 'Navigation/Tabs',
  decorators: [moduleMetadata({ imports: [MatTabsModule, MatButtonModule, MatIconModule] })],
};

export default meta;
type Story = StoryObj;

/**
 * `stretchTabs` and `alignTabs` are bound with the odd aliases
 * `[mat-stretch-tabs]` and `[mat-align-tabs]`. Turn stretching off first, or
 * alignment has nothing to do.
 */
export const Playground: Story = {
  argTypes: {
    selectedIndex: { control: { type: 'number', min: 0, max: 2, step: 1 } },
    headerPosition: { control: 'inline-radio', options: ['above', 'below'] },
    stretchTabs: { control: 'boolean', description: 'Bound as `[mat-stretch-tabs]`.' },
    alignTabs: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    dynamicHeight: { control: 'boolean' },
  },
  args: {
    selectedIndex: 0,
    headerPosition: 'above',
    stretchTabs: true,
    alignTabs: 'start',
    dynamicHeight: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-surface" style="width: 520px; padding: 8px">
        <mat-tab-group
          [selectedIndex]="selectedIndex"
          [headerPosition]="headerPosition"
          [mat-stretch-tabs]="stretchTabs"
          [mat-align-tabs]="alignTabs"
          [dynamicHeight]="dynamicHeight"
        >
          <mat-tab label="Overview">
            <div style="padding: 16px; font: var(--mat-sys-body-medium)">Traffic is up 12% this week.</div>
          </mat-tab>
          <mat-tab label="Activity">
            <div style="padding: 16px; font: var(--mat-sys-body-medium)">
              <p>Three deploys today.</p>
              <p>Two open incidents.</p>
            </div>
          </mat-tab>
          <mat-tab label="Settings" [disabled]="true">
            <div style="padding: 16px">Disabled</div>
          </mat-tab>
        </mat-tab-group>
      </div>`,
  }),
};

/** The whole component in its plainest form: a `label` and some content. */
export const BasicTabs: Story = {
  render: () => ({
    template: `
      <div class="docs-surface" style="width: 480px; padding: 8px">
        <mat-tab-group>
          <mat-tab label="Details">
            <div style="padding: 16px; font: var(--mat-sys-body-medium)">Order #1042, placed on 3 March.</div>
          </mat-tab>
          <mat-tab label="Shipping">
            <div style="padding: 16px; font: var(--mat-sys-body-medium)">Leaves the warehouse tomorrow.</div>
          </mat-tab>
        </mat-tab-group>
      </div>`,
  }),
};

/**
 * Content inside a plain `<mat-tab>` is created as soon as the group is. Wrap it
 * in `<ng-template matTabContent>` and it waits until the tab is opened, which
 * matters when the panel runs a query or mounts a chart.
 */
export const LazyContent: Story = {
  decorators: [moduleMetadata({ imports: [LazyTabs] })],
  render: () => ({ template: `<demo-lazy-tabs />` }),
};

/**
 * `label` takes a string. For anything richer, use `<ng-template mat-tab-label>`
 * and put markup inside it.
 */
export const CustomLabels: Story = {
  render: () => ({
    template: `
      <div class="docs-surface" style="width: 520px; padding: 8px">
        <mat-tab-group>
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon style="margin-inline-end: 8px">inbox</mat-icon>
              Inbox
            </ng-template>
            <div style="padding: 16px; font: var(--mat-sys-body-medium)">12 unread messages.</div>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon style="margin-inline-end: 8px">error</mat-icon>
              Failures
            </ng-template>
            <div style="padding: 16px; font: var(--mat-sys-body-medium)">2 failed jobs.</div>
          </mat-tab>
        </mat-tab-group>
      </div>`,
  }),
};

/**
 * Tabs built from a signal. Track by a stable id, and clamp `selectedIndex`
 * yourself when a tab is removed, or the group lands on nothing.
 */
export const DynamicTabs: Story = {
  decorators: [moduleMetadata({ imports: [DynamicTabsComponent] })],
  render: () => ({ template: `<demo-dynamic-tabs />` }),
};

/**
 * When each tab is a route, use `mat-tab-nav-bar`. It is a header only: the
 * router outlet renders the content, so a reload or a shared link lands on the
 * right tab.
 */
export const RouterNavBar: Story = {
  decorators: [moduleMetadata({ imports: [RouterModule] })],
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `
      <div style="height: 300px">
        <nav mat-tab-nav-bar [tabPanel]="tabPanel" aria-label="Project sections">
          <a mat-tab-link routerLink="/overview" routerLinkActive #o="routerLinkActive" [active]="o.isActive">Overview</a>
          <a mat-tab-link routerLink="/members" routerLinkActive #m="routerLinkActive" [active]="m.isActive">Members</a>
          <a mat-tab-link routerLink="/settings" routerLinkActive #s="routerLinkActive" [active]="s.isActive">Settings</a>
        </nav>
        <mat-tab-nav-panel #tabPanel>
          <div style="padding: 16px; font: var(--mat-sys-body-medium)">
            <router-outlet />
            <p>The active link comes from the URL, so this survives a reload.</p>
          </div>
        </mat-tab-nav-panel>
      </div>`,
  }),
};
