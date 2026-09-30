import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { STATES } from '../autocomplete.constants';
import { statesMatching } from '../autocomplete.utils';

/**
 * Filtering with signals: the control value becomes a signal via `toSignal`,
 * and the option list is a `computed` derived from it. No subscriptions, no
 * `async` pipe.
 */
@Component({
  selector: 'docs-autocomplete-filter',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './autocomplete-filter.component.html',
  styleUrl: './autocomplete-filter.component.scss',
})
export class AutocompleteFilter {
  readonly control = new FormControl('');
  readonly _query = toSignal(this.control.valueChanges, { initialValue: '' });

  readonly filtered = computed(() => statesMatching(STATES, this._query()));
}
