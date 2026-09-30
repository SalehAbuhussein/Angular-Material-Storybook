import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { DefaultFilter } from './default-filter/default-filter.component';
import { FilterPredicate } from './filter-predicate/filter-predicate.component';
import { FilterSelection } from './filter-selection/filter-selection.component';
import { SingleSelectionDemo } from './single-selection/single-selection.component';

/**
 * Filtering and selection are the two features every real table grows. Both live
 * outside the table markup: filtering on `MatTableDataSource`, selection in a
 * `SelectionModel` from `@angular/cdk/collections`.
 */
const meta: Meta = {
  title: 'Data Table/Filter and Selection',
  decorators: [
    moduleMetadata({
      imports: [FilterSelection, DefaultFilter, FilterPredicate, SingleSelectionDemo],
    }),
  ],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/** Type in the filter, tick some rows, then switch off multiple selection. */
export const Playground: Story = {
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Multiple selection plus the select-all header checkbox.',
    },
    filterPlaceholder: { control: 'text' },
  },
  args: { allowMultiple: true, filterPlaceholder: 'ada, platform, owner' },
  render: (args) => ({
    props: args,
    template: `<demo-filter-selection
      [allowMultiple]="allowMultiple"
      [filterPlaceholder]="filterPlaceholder" />`,
  }),
};

/** Setting `dataSource.filter` matches against every value of every row. */
export const FilterInput: Story = {
  render: () => ({ template: `<demo-default-filter />` }),
};

/** `filterPredicate` decides what the filter string means. */
export const CustomFilterPredicate: Story = {
  render: () => ({ template: `<demo-filter-predicate />` }),
};

/** `new SelectionModel(false)` allows one selected row at a time. */
export const SingleSelection: Story = {
  render: () => ({ template: `<demo-single-selection />` }),
};
