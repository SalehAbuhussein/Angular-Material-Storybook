import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

// Aliased because story exports below share these names.
import { ActionList as ActionListComponent } from './action-list/action-list.component';
import { SelectionList as SelectionListComponent } from './selection-list/selection-list.component';

/** A tiny inline avatar so the examples never depend on the network. */
const AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="#6750a4"/>
      <circle cx="20" cy="16" r="7" fill="#ffffff" opacity="0.85"/>
      <path d="M6 40a14 14 0 0 1 28 0z" fill="#ffffff" opacity="0.85"/>
    </svg>`,
  );

/**
 * `MatList` is a family of four components that share one item component. Pick
 * the wrapper by what the items do: display (`mat-list`), navigate
 * (`mat-nav-list`), select (`mat-selection-list`) or act (`mat-action-list`).
 */
const meta: Meta = {
  title: 'Layout/List',
  decorators: [
    moduleMetadata({
      imports: [
        MatListModule,
        MatIconModule,
        MatDividerModule,
        SelectionListComponent,
        ActionListComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** Turn the slots on and off to see how an item's height follows its content. */
export const Playground: Story = {
  argTypes: {
    showLines: { control: 'boolean', description: 'Render a secondary line under each title.' },
    showAvatar: { control: 'boolean' },
    showMeta: { control: 'boolean', description: 'Render trailing content on each item.' },
  },
  args: { showLines: true, showAvatar: true, showMeta: true },
  render: (args) => ({
    props: { ...args, avatar: AVATAR },
    template: `
      <mat-list style="width: 360px">
        @for (name of ['Dana Wu', 'Sam Ortiz', 'Priya Raman']; track name) {
          <mat-list-item>
            @if (showAvatar) { <img matListItemAvatar [src]="avatar" alt="" /> }
            <span matListItemTitle>{{ name }}</span>
            @if (showLines) { <span matListItemLine>Last active 2 hours ago</span> }
            @if (showMeta) { <span matListItemMeta>3</span> }
          </mat-list-item>
        }
      </mat-list>`,
  }),
};

/**
 * A plain `mat-list` is read-only. Items are not focusable and get no hover
 * state, which is what you want for data you are only showing.
 */
export const BasicList: Story = {
  render: () => ({
    template: `
      <mat-list style="width: 320px">
        <div matSubheader>Today</div>
        <mat-list-item>Deploy 4.2.1</mat-list-item>
        <mat-list-item>Rotate the staging keys</mat-list-item>
        <mat-divider></mat-divider>
        <div matSubheader>Yesterday</div>
        <mat-list-item>Close the incident report</mat-list-item>
      </mat-list>`,
  }),
};

/**
 * `mat-nav-list` items are anchors. They get a hover state, a ripple and the
 * `activated` input for marking the current page.
 */
export const NavList: Story = {
  render: () => ({
    template: `
      <mat-nav-list style="width: 280px">
        <a mat-list-item routerLink="/inbox" activated>
          <mat-icon matListItemIcon>inbox</mat-icon>
          <span matListItemTitle>Inbox</span>
          <span matListItemMeta>12</span>
        </a>
        <a mat-list-item routerLink="/starred">
          <mat-icon matListItemIcon>star</mat-icon>
          <span matListItemTitle>Starred</span>
        </a>
        <a mat-list-item routerLink="/archive">
          <mat-icon matListItemIcon>archive</mat-icon>
          <span matListItemTitle>Archive</span>
        </a>
      </mat-nav-list>`,
  }),
};

/**
 * `mat-selection-list` renders a listbox. Each `mat-list-option` shows a
 * checkbox and reports through `selectionChange`.
 */
export const SelectionList: Story = {
  render: () => ({ template: `<docs-selection-list />` }),
};

/** `mat-action-list` items are `<button>` elements, so they submit nothing and take a click handler. */
export const ActionList: Story = {
  render: () => ({ template: `<docs-action-list />` }),
};

/**
 * Three lines is the maximum a single item supports. Beyond that the text is
 * clipped, so move the overflow into a detail view.
 */
export const LinesAndAvatars: Story = {
  render: () => ({
    props: { avatar: AVATAR },
    template: `
      <mat-list style="width: 420px">
        <mat-list-item>
          <img matListItemAvatar [src]="avatar" alt="" />
          <span matListItemTitle>Priya Raman</span>
          <span matListItemLine>Re: quarterly numbers</span>
          <span matListItemLine>The revised deck is attached, let me know.</span>
          <span matListItemMeta>09:41</span>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
          <mat-icon matListItemIcon>folder</mat-icon>
          <span matListItemTitle>Design assets</span>
          <span matListItemLine>14 files</span>
          <button matListItemMeta style="all: unset; cursor: pointer">
            <mat-icon aria-label="More options for Design assets">more_vert</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>`,
  }),
};
