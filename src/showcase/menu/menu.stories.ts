import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { MenuData } from './menu-data/menu-data.component';

/**
 * A menu is two pieces: a `<mat-menu>` template that renders nothing on its own,
 * and a trigger that points at it with `[matMenuTriggerFor]`. The panel is
 * rendered in an overlay, not where you declared it.
 */
const meta: Meta = {
  title: 'Navigation/Menu',
  decorators: [
    moduleMetadata({ imports: [MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule] }),
  ],
};

export default meta;
type Story = StoryObj;

/** Move the panel around the trigger with `xPosition` and `yPosition`. */
export const Playground: Story = {
  argTypes: {
    xPosition: { control: 'inline-radio', options: ['before', 'after'] },
    yPosition: { control: 'inline-radio', options: ['above', 'below'] },
    overlapTrigger: { control: 'boolean', description: 'Let the panel cover its trigger.' },
  },
  args: { xPosition: 'after', yPosition: 'below', overlapTrigger: false },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo">
        <button matButton="filled" [matMenuTriggerFor]="menu">Actions</button>
        <mat-menu #menu [xPosition]="xPosition" [yPosition]="yPosition" [overlapTrigger]="overlapTrigger">
          <button mat-menu-item>Rename</button>
          <button mat-menu-item>Duplicate</button>
          <button mat-menu-item disabled>Archive</button>
        </mat-menu>
      </div>`,
  }),
};

/**
 * Menu items are `<button mat-menu-item>`, or `<a mat-menu-item>` when the item
 * navigates. Anything else loses keyboard support.
 */
export const BasicMenu: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <button matButton [matMenuTriggerFor]="account">Account</button>
        <mat-menu #account>
          <button mat-menu-item>Profile</button>
          <button mat-menu-item>Settings</button>
          <mat-divider />
          <button mat-menu-item>Sign out</button>
        </mat-menu>
      </div>`,
  }),
};

/**
 * `<mat-icon>` projects into the leading slot automatically. Shortcuts are plain
 * text pushed to the end; the menu does not lay them out for you.
 */
export const IconsAndShortcuts: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <button matButton="outlined" [matMenuTriggerFor]="edit">Edit</button>
        <mat-menu #edit>
          <button mat-menu-item>
            <mat-icon>content_cut</mat-icon>
            <span>Cut</span>
            <span style="flex: 1 1 auto"></span>
            <span style="color: var(--mat-sys-on-surface-variant)">Ctrl+X</span>
          </button>
          <button mat-menu-item>
            <mat-icon>content_copy</mat-icon>
            <span>Copy</span>
            <span style="flex: 1 1 auto"></span>
            <span style="color: var(--mat-sys-on-surface-variant)">Ctrl+C</span>
          </button>
          <button mat-menu-item>
            <mat-icon>content_paste</mat-icon>
            <span>Paste</span>
            <span style="flex: 1 1 auto"></span>
            <span style="color: var(--mat-sys-on-surface-variant)">Ctrl+V</span>
          </button>
        </mat-menu>
      </div>`,
  }),
};

/**
 * A submenu is just another `<mat-menu>` pointed at from an item. Hovering or
 * pressing the right arrow opens it; the keyboard walk is handled for you.
 */
export const NestedMenus: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <button matButton="filled" [matMenuTriggerFor]="root">Share</button>

        <mat-menu #root>
          <button mat-menu-item [matMenuTriggerFor]="people">
            <mat-icon>person</mat-icon>
            <span>People</span>
          </button>
          <button mat-menu-item [matMenuTriggerFor]="apps">
            <mat-icon>apps</mat-icon>
            <span>Apps</span>
          </button>
          <button mat-menu-item>
            <mat-icon>link</mat-icon>
            <span>Copy link</span>
          </button>
        </mat-menu>

        <mat-menu #people>
          <button mat-menu-item>Ada Lovelace</button>
          <button mat-menu-item>Grace Hopper</button>
        </mat-menu>

        <mat-menu #apps>
          <button mat-menu-item>Slack</button>
          <button mat-menu-item>Email</button>
        </mat-menu>
      </div>`,
  }),
};

/**
 * One menu shared by many rows. Wrap the items in `ng-template matMenuContent`,
 * pass the row through `[matMenuTriggerData]`, and read it with `let-`. Without
 * the template the menu renders once and captures the wrong row.
 */
export const PassingData: Story = {
  decorators: [moduleMetadata({ imports: [MenuData] })],
  render: () => ({ template: `<demo-menu-data />` }),
};

/**
 * `matContextMenuTriggerFor` replaces the browser's right-click menu on whatever
 * element carries it, and takes the same data object.
 */
export const ContextMenu: Story = {
  render: () => ({
    template: `
      <div class="docs-demo">
        <div
          [matContextMenuTriggerFor]="context"
          [matContextMenuTriggerData]="{ target: 'canvas' }"
          style="width: 320px; height: 140px; display: grid; place-items: center;
                 border: 1px dashed var(--mat-sys-outline); border-radius: var(--mat-sys-corner-medium);
                 font: var(--mat-sys-body-medium)"
        >
          Right-click inside this box
        </div>

        <mat-menu #context>
          <ng-template matMenuContent let-target="target">
            <button mat-menu-item><mat-icon>add</mat-icon><span>New item on {{ target }}</span></button>
            <button mat-menu-item><mat-icon>refresh</mat-icon><span>Refresh</span></button>
          </ng-template>
        </mat-menu>
      </div>`,
  }),
};
