import { MatPaginatorModule } from '@angular/material/paginator';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { PaginatedTable } from './paginated-table/paginated-table.component';
import { PaginatorPlayground } from './paginator-playground/paginator-playground.component';
import { ServerPaging } from './server-paging/server-paging.component';

/**
 * `MatPaginator` is a navigation control, not a data control. It tells you which
 * page someone asked for; slicing the rows is either `MatTableDataSource`'s job
 * or yours.
 */
const meta: Meta = {
  title: 'Data Table/Pagination',
  decorators: [
    moduleMetadata({
      imports: [
        MatPaginatorModule,
        PaginatorPlayground,
        PaginatedTable,
        ServerPaging,
      ],
    }),
  ],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/** Every input that changes what the paginator shows, with the page event logged. */
export const Playground: Story = {
  argTypes: {
    length: { control: { type: 'number', min: 0 }, description: 'Total number of items.' },
    pageSize: { control: { type: 'number', min: 1 }, description: 'Items per page.' },
    pageSizeOptions: { control: 'object', description: 'Sizes offered in the select.' },
    hidePageSize: { control: 'boolean', description: 'Hide the page size select.' },
    showFirstLastButtons: { control: 'boolean', description: 'Show first and last page buttons.' },
    disabled: { control: 'boolean' },
  },
  args: {
    length: 200,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100],
    hidePageSize: false,
    showFirstLastButtons: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<demo-paginator-playground
      [length]="length"
      [pageSize]="pageSize"
      [pageSizeOptions]="pageSizeOptions"
      [hidePageSize]="hidePageSize"
      [showFirstLastButtons]="showFirstLastButtons"
      [disabled]="disabled" />`,
  }),
};

/** With a `MatTableDataSource` you never set `length` yourself. */
export const WithMatTableDataSource: Story = {
  render: () => ({ template: `<demo-paginated-table />` }),
};

/** One page in memory, the total from the server, the fetch driven by `(page)`. */
export const ServerSidePaging: Story = {
  render: () => ({ template: `<demo-server-paging />` }),
};

/**
 * A compact paginator for tight layouts: fixed page size, no size select, no
 * first and last buttons.
 */
export const Compact: Story = {
  render: () => ({
    template: `
      <div class="docs-surface">
        <mat-paginator [length]="47" [pageSize]="10" hidePageSize aria-label="Select page" />
      </div>`,
  }),
};
