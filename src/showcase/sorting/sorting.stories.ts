import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { BasicSorting as BasicSortingComponent } from './basic-sorting/basic-sorting.component';
import { SortChange } from './sort-change/sort-change.component';
import { SortingAccessor } from './sorting-accessor/sorting-accessor.component';
import { SortingPlayground } from './sorting-playground/sorting-playground.component';

/**
 * `MatSort` is a directive you put on the table and `mat-sort-header` is a
 * directive you put on each sortable header cell. With `MatTableDataSource` you
 * wire the two together once and sorting works.
 */
const meta: Meta = {
  title: 'Data Table/Sorting',
  decorators: [
    moduleMetadata({
      imports: [SortingPlayground, BasicSortingComponent, SortingAccessor, SortChange],
    }),
  ],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

/**
 * `matSortActive` and `matSortDirection` set the sort the table starts with.
 * `matSortDisableClear` removes the third click that returns to the unsorted order.
 */
export const Playground: Story = {
  argTypes: {
    sortActive: {
      control: 'inline-radio',
      options: ['name', 'downloads', 'updated'],
      description: 'Column sorted on first render (`matSortActive`).',
    },
    sortDirection: {
      control: 'inline-radio',
      options: ['asc', 'desc'],
      description: 'Starting direction (`matSortDirection`).',
    },
    disableClear: {
      control: 'boolean',
      description: 'Skip the unsorted state when cycling (`matSortDisableClear`).',
    },
  },
  args: { sortActive: 'downloads', sortDirection: 'desc', disableClear: false },
  render: (args) => ({
    props: args,
    template: `<demo-sorting-playground
      [sortActive]="sortActive"
      [sortDirection]="sortDirection"
      [disableClear]="disableClear" />`,
  }),
};

/** Headers without `mat-sort-header` stay unsortable, like the size column here. */
export const BasicSorting: Story = {
  render: () => ({ template: `<demo-basic-sorting />` }),
};

/** Sort a formatted string by what it means rather than by its characters. */
export const CustomSortingDataAccessor: Story = {
  render: () => ({ template: `<demo-sorting-accessor />` }),
};

/** Server-side or custom sorting: listen to `matSortChange` and reorder yourself. */
export const HandlingSortChange: Story = {
  render: () => ({ template: `<demo-sort-change />` }),
};
