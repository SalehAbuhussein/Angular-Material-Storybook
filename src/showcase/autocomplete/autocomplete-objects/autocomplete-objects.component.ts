import { Component, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { USERS } from './autocomplete-objects.constants';
import type { UserValue } from './autocomplete-objects.types';
import { userText, usersMatching } from './autocomplete-objects.utils';

/**
 * With object values the control holds a `User`, so `displayWith` is what turns
 * it back into text for the input.
 */
@Component({
  selector: 'docs-autocomplete-objects',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './autocomplete-objects.component.html',
  styleUrl: './autocomplete-objects.component.scss',
})
export class AutocompleteObjects {
  readonly control = new FormControl<UserValue>(null);
  readonly _query = toSignal(this.control.valueChanges, { initialValue: null });

  readonly filtered = computed(() => usersMatching(USERS, this._query()));

  readonly displayUser = userText;
}
