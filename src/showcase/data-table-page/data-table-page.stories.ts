import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { DataTablePage } from './data-table-page.component';

const meta: Meta = {
  title: 'Full Layouts/Data Table Page',
  decorators: [moduleMetadata({ imports: [DataTablePage] })],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * Sort by any header, type in the search box, pick a status, tick rows to bring
 * up the bulk bar, and page through. All of it is live.
 */
export const Playground: Story = {
  argTypes: {
    rowCount: { control: { type: 'number', min: 0, max: 200, step: 8 }, description: 'How many orders to generate.' },
    pageSize: { control: 'inline-radio', options: [5, 10, 25] },
    loading: { control: 'boolean', description: 'Show the indeterminate progress bar above the table.' },
    height: { control: { type: 'number', min: 480, max: 1000, step: 20 } },
  },
  args: { rowCount: 48, pageSize: 10, loading: false, height: 720 },
  render: (args) => ({
    props: args,
    template: `<demo-data-table-page
      [rowCount]="rowCount" [pageSize]="pageSize" [loading]="loading" [height]="height" />`,
  }),
};

/** Tick a row and the filter bar is replaced by the bulk action bar. */
export const RowSelection: Story = {
  render: () => ({ template: `<demo-data-table-page [rowCount]="12" [pageSize]="5" [height]="640" />` }),
};

/** `*matNoDataRow` renders whenever the filter leaves nothing to show. */
export const EmptyAfterFilter: Story = {
  render: () => ({
    template: `<demo-data-table-page [rowCount]="24" [startEmpty]="true" [height]="640" />`,
  }),
};

/** The first-run case: no data at all, before any filter is applied. */
export const NoDataAtAll: Story = {
  render: () => ({ template: `<demo-data-table-page [rowCount]="0" [height]="560" />` }),
};

/** Loading keeps the table in place and puts a progress bar above it. */
export const Loading: Story = {
  render: () => ({
    template: `<demo-data-table-page [rowCount]="24" [loading]="true" [height]="640" />`,
  }),
};
