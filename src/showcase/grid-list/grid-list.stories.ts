import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const TILE = 'background: var(--mat-sys-primary-container); color: var(--mat-sys-on-primary-container)';
const TILE_ALT = 'background: var(--mat-sys-tertiary-container); color: var(--mat-sys-on-tertiary-container)';

/**
 * `MatGridList` lays tiles out in a fixed number of columns and computes every
 * tile's width and height in JavaScript. That is its one trick: tiles can span
 * columns and rows, and rows can be sized by ratio.
 */
const meta: Meta = {
  title: 'Layout/Grid List',
  decorators: [moduleMetadata({ imports: [MatGridListModule, MatIconModule] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/** Change `cols`, `rowHeight` and `gutterSize` and watch the tiles recompute. */
export const Playground: Story = {
  argTypes: {
    cols: { control: { type: 'number', min: 1, max: 8 } },
    rowHeight: {
      control: 'text',
      description: 'A CSS length ("80px"), a width:height ratio ("4:3") or "fit".',
    },
    gutterSize: { control: 'text', description: 'A CSS length between tiles.' },
  },
  args: { cols: 4, rowHeight: '80px', gutterSize: '8px' },
  render: (args) => ({
    props: { ...args, tile: TILE },
    template: `
      <div class="docs-surface" style="padding: 16px">
        <mat-grid-list [cols]="cols" [rowHeight]="rowHeight" [gutterSize]="gutterSize">
          @for (n of [1, 2, 3, 4, 5, 6, 7, 8]; track n) {
            <mat-grid-tile [style]="tile">{{ n }}</mat-grid-tile>
          }
        </mat-grid-list>
      </div>`,
  }),
};

/**
 * `colspan` and `rowspan` make a tile cover several cells. The total span of a
 * row can never exceed `cols`, or the layout throws.
 */
export const Spans: Story = {
  render: () => ({
    props: { tile: TILE, alt: TILE_ALT },
    template: `
      <div class="docs-surface" style="padding: 16px">
        <mat-grid-list cols="4" rowHeight="80px" gutterSize="8px">
          <mat-grid-tile [colspan]="2" [rowspan]="2" [style]="alt">2 x 2</mat-grid-tile>
          <mat-grid-tile [style]="tile">1 x 1</mat-grid-tile>
          <mat-grid-tile [style]="tile">1 x 1</mat-grid-tile>
          <mat-grid-tile [colspan]="2" [style]="tile">2 x 1</mat-grid-tile>
          <mat-grid-tile [colspan]="4" [style]="tile">4 x 1</mat-grid-tile>
        </mat-grid-list>
      </div>`,
  }),
};

/**
 * Three ways to size a row: a fixed length, a `width:height` ratio that keeps
 * tiles proportional as the container resizes, and `fit`, which divides the
 * list's own height between the rows.
 */
export const RowHeights: Story = {
  render: () => ({
    props: { tile: TILE },
    template: `
      <div class="docs-surface" style="padding: 16px; display: grid; gap: 24px">
        <div>
          <p><code>rowHeight="64px"</code></p>
          <mat-grid-list cols="4" rowHeight="64px" gutterSize="8px">
            @for (n of [1, 2, 3, 4]; track n) {
              <mat-grid-tile [style]="tile">{{ n }}</mat-grid-tile>
            }
          </mat-grid-list>
        </div>
        <div>
          <p><code>rowHeight="4:1"</code></p>
          <mat-grid-list cols="4" rowHeight="4:1" gutterSize="8px">
            @for (n of [1, 2, 3, 4]; track n) {
              <mat-grid-tile [style]="tile">{{ n }}</mat-grid-tile>
            }
          </mat-grid-list>
        </div>
        <div>
          <p><code>rowHeight="fit"</code> inside a 160px box</p>
          <mat-grid-list cols="4" rowHeight="fit" gutterSize="8px" style="height: 160px">
            @for (n of [1, 2, 3, 4, 5, 6, 7, 8]; track n) {
              <mat-grid-tile [style]="tile">{{ n }}</mat-grid-tile>
            }
          </mat-grid-list>
        </div>
      </div>`,
  }),
};

/**
 * A tile can carry a header or a footer, which overlay the top and bottom of the
 * tile. `matGridAvatar` and `matLine` position content inside them.
 */
export const HeadersAndFooters: Story = {
  render: () => ({
    props: { tile: TILE, alt: TILE_ALT },
    template: `
      <div class="docs-surface" style="padding: 16px">
        <mat-grid-list cols="3" rowHeight="160px" gutterSize="12px">
          <mat-grid-tile [style]="tile">
            <mat-grid-tile-header>
              <mat-icon matGridAvatar>photo</mat-icon>
              <h3 matLine>Harbour</h3>
              <span matLine>Oslo, 2023</span>
            </mat-grid-tile-header>
          </mat-grid-tile>
          <mat-grid-tile [style]="alt">
            <mat-grid-tile-footer>
              <h3 matLine>Rooftops</h3>
              <span matLine>Lisbon, 2024</span>
            </mat-grid-tile-footer>
          </mat-grid-tile>
          <mat-grid-tile [style]="tile">
            <mat-grid-tile-header><h3 matLine>Header</h3></mat-grid-tile-header>
            <mat-grid-tile-footer><h3 matLine>and footer</h3></mat-grid-tile-footer>
          </mat-grid-tile>
        </mat-grid-list>
      </div>`,
  }),
};

/**
 * The same gallery in plain CSS grid: it wraps on small screens, needs no
 * JavaScript, and lets tiles grow with their content.
 */
export const CssGridInstead: Story = {
  render: () => ({
    props: { tile: TILE },
    template: `
      <div class="docs-surface" style="padding: 16px">
        <div style="display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))">
          @for (n of [1, 2, 3, 4, 5, 6, 7, 8]; track n) {
            <div [style]="tile + '; border-radius: 12px; padding: 16px'">Tile {{ n }}</div>
          }
        </div>
      </div>`,
  }),
};
