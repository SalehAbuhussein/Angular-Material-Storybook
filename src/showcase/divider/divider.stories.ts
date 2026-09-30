import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

/**
 * `MatDivider` is a themed `<hr>`. Two inputs, no behaviour: `inset` pulls the
 * line in from the leading edge, `vertical` turns it 90 degrees.
 */
const meta: Meta = {
  title: 'Layout/Divider',
  decorators: [
    moduleMetadata({
      imports: [MatDividerModule, MatListModule, MatCardModule, MatIconModule, MatButtonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/**
 * Toggle `vertical` and note that the vertical divider needs a parent with a
 * height, otherwise it collapses to nothing.
 */
export const Playground: Story = {
  argTypes: {
    inset: { control: 'boolean' },
    vertical: { control: 'boolean' },
  },
  args: { inset: false, vertical: false },
  render: (args) => ({
    props: args,
    template: `
      <div class="docs-demo" style="width: 320px">
        <div style="display: flex; align-items: center; gap: 16px; height: 48px">
          <span>Before</span>
          @if (vertical) {
            <mat-divider [vertical]="true" [inset]="inset"></mat-divider>
          }
          <span>After</span>
        </div>
        @if (!vertical) {
          <mat-divider [inset]="inset" style="width: 100%"></mat-divider>
        }
      </div>`,
  }),
};

/** `inset` indents the line so it starts where the text starts, not at the edge. */
export const Inset: Story = {
  render: () => ({
    template: `
      <div class="docs-demo" style="width: 320px">
        <p style="margin: 0">Full bleed</p>
        <mat-divider style="width: 100%"></mat-divider>
        <p style="margin: 0">Inset</p>
        <mat-divider inset style="width: 100%"></mat-divider>
        <p style="margin: 0">End</p>
      </div>`,
  }),
};

/**
 * A vertical divider separates items on one row. Give the row a height and the
 * divider stretches to it.
 */
export const Vertical: Story = {
  render: () => ({
    template: `
      <div class="docs-demo docs-demo--row" style="height: 40px">
        <button matButton>Cut</button>
        <mat-divider [vertical]="true"></mat-divider>
        <button matButton>Copy</button>
        <mat-divider [vertical]="true"></mat-divider>
        <button matButton>Paste</button>
      </div>`,
  }),
};

/**
 * Inside a list, put the divider between items and Angular Material lines it up
 * with the item padding. `inset` aligns it with the text instead of the avatar.
 */
export const InsideAList: Story = {
  render: () => ({
    template: `
      <mat-list style="width: 340px">
        <mat-list-item>
          <mat-icon matListItemIcon>inbox</mat-icon>
          <span matListItemTitle>Inbox</span>
          <span matListItemLine>12 unread</span>
        </mat-list-item>
        <mat-divider inset></mat-divider>
        <mat-list-item>
          <mat-icon matListItemIcon>send</mat-icon>
          <span matListItemTitle>Sent</span>
          <span matListItemLine>Nothing pending</span>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
          <mat-icon matListItemIcon>delete</mat-icon>
          <span matListItemTitle>Trash</span>
        </mat-list-item>
      </mat-list>`,
  }),
};

/** In a card, a divider marks the line between the content and the actions. */
export const InsideACard: Story = {
  render: () => ({
    template: `
      <mat-card appearance="outlined" style="max-width: 320px">
        <mat-card-header>
          <mat-card-title>Storage</mat-card-title>
          <mat-card-subtitle>84 GB of 100 GB used</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>Photos and backups take most of the space.</mat-card-content>
        <mat-divider></mat-divider>
        <mat-card-actions align="end">
          <button matButton>Manage</button>
          <button matButton="filled">Upgrade</button>
        </mat-card-actions>
      </mat-card>`,
  }),
};
