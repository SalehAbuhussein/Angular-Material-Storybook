import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { EmptyTable } from './empty-table/empty-table.component';
import { ExpandableTable } from './expandable-table/expandable-table.component';
import { PlainArrayTable } from './plain-array-table/plain-array-table.component';
import { StickyTable } from './sticky-table/sticky-table.component';
import { TablePlayground } from './table-playground/table-playground.component';

/**
 * `MatTable` is a column-first table. You never write rows of cells; you declare
 * one `matColumnDef` per column with a header template and a cell template, then
 * list the column names you want rendered.
 */
const meta: Meta = {
  title: 'Data Table/Table',
  decorators: [
    moduleMetadata({
      imports: [
        PlainArrayTable,
        TablePlayground,
        StickyTable,
        ExpandableTable,
        EmptyTable,
      ],
    }),
  ],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * `displayedColumns` decides which columns render and in what order. The column
 * definitions themselves never change; reordering the array reorders the table.
 */
export const Playground: Story = {
  argTypes: {
    displayedColumns: {
      control: 'check',
      options: ['version', 'name', 'released', 'status'],
      description: 'Column names passed to `matHeaderRowDef` and `matRowDefColumns`.',
    },
    showFooter: { control: 'boolean', description: 'Render the `matFooterRowDef` row.' },
  },
  args: {
    displayedColumns: ['version', 'name', 'released', 'status'],
    showFooter: false,
  },
  render: (args) => ({
    props: args,
    template: `<demo-table-playground [displayedColumns]="displayedColumns" [showFooter]="showFooter" />`,
  }),
};

/** A plain array works as a data source. You lose sorting, paging and filtering. */
export const PlainArray: Story = {
  render: () => ({ template: `<demo-plain-array-table />` }),
};

/** Sticky header plus a sticky first and last column. Both need a scroll container. */
export const StickyHeaderAndColumns: Story = {
  render: () => ({ template: `<demo-sticky-table />` }),
};

/** `multiTemplateDataRows` lets one data row render two `matRowDef` templates. */
export const ExpandableRows: Story = {
  render: () => ({ template: `<demo-expandable-table />` }),
};

/** Toggle the data away to see the `matNoDataRow` template take over. */
export const EmptyState: Story = {
  render: () => ({ template: `<demo-empty-table />` }),
};
