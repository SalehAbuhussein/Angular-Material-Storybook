import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

import { AutocompleteFilter } from './autocomplete-filter/autocomplete-filter.component';
import { AutocompleteObjects } from './autocomplete-objects/autocomplete-objects.component';
import { AutocompleteRequire } from './autocomplete-require/autocomplete-require.component';
import { AutocompleteSelected } from './autocomplete-selected/autocomplete-selected.component';
import { STATES } from './autocomplete.constants';

/**
 * The autocomplete is a panel attached to a plain `matInput`. The input keeps
 * the value; the panel only suggests. That is the whole model.
 */
const meta: Meta = {
  title: 'Form Controls/Autocomplete',
  decorators: [
    moduleMetadata({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        ReactiveFormsModule,
        AutocompleteFilter,
        AutocompleteObjects,
        AutocompleteRequire,
        AutocompleteSelected,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

/** The panel inputs, on a static list so the behaviour is easy to compare. */
export const Playground: Story = {
  argTypes: {
    autoActiveFirstOption: {
      control: 'boolean',
      description: 'Highlights the first option so Enter picks it.',
    },
    autoSelectActiveOption: {
      control: 'boolean',
      description: 'Writes the highlighted option into the input as you arrow through.',
    },
    requireSelection: {
      control: 'boolean',
      description: 'Clears the input on blur unless an option was chosen.',
    },
    hideSingleSelectionIndicator: { control: 'boolean' },
    panelWidth: { control: 'select', options: ['auto', '360px'] },
  },
  args: {
    autoActiveFirstOption: false,
    panelWidth: '360px',
    autoSelectActiveOption: false,
    requireSelection: true,
    hideSingleSelectionIndicator: true,
  },

  render: (args) => ({
    props: { ...args, states: STATES },
    template: `
      <div class="docs-demo">
        <mat-form-field appearance="outline">
          <mat-label>State</mat-label>
          <input matInput [matAutocomplete]="auto" placeholder="Click to open" />
          <mat-autocomplete
            #auto="matAutocomplete"
            [autoActiveFirstOption]="autoActiveFirstOption"
            [autoSelectActiveOption]="autoSelectActiveOption"
            [requireSelection]="requireSelection"
            [hideSingleSelectionIndicator]="hideSingleSelectionIndicator"
            [panelWidth]="panelWidth">
            @for (state of states; track state) {
              <mat-option [value]="state">{{ state }}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>
      </div>`,
  }),
};

/** Filtering with `toSignal` plus `computed`. No subscriptions to clean up. */
export const FilteringWithSignals: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-autocomplete-filter /></div>` }),
};

/** Object values need `displayWith` to render as text in the input. */
export const DisplayWith: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-autocomplete-objects /></div>` }),
};

/** `requireSelection` refuses to keep free text. */
export const RequireSelection: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-autocomplete-require /></div>` }),
};

/** `optionSelected` gives you the `MatOption` that was picked. */
export const OptionSelected: Story = {
  render: () => ({ template: `<div class="docs-demo"><docs-autocomplete-selected /></div>` }),
};
