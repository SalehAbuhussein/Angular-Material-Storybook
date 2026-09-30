import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { STATES } from '../autocomplete.constants';
import { statesMatching } from '../autocomplete.utils';

/**
 * `requireSelection` clears anything typed that does not match an option, so the
 * control can never hold a half-typed string.
 */
@Component({
  selector: 'docs-autocomplete-require',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './autocomplete-require.component.html',
  styleUrl: './autocomplete-require.component.scss',
})
export class AutocompleteRequire {
  readonly control = new FormControl('');
  readonly _query = toSignal(this.control.valueChanges, { initialValue: '' });

  readonly filtered = computed(() => statesMatching(STATES, this._query()));
}
