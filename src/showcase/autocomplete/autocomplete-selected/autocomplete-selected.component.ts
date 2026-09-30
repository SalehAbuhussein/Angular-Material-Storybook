import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  type MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { STATES } from '../autocomplete.constants';

/** `optionSelected` is the hook for side effects after a pick. */
@Component({
  selector: 'docs-autocomplete-selected',
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './autocomplete-selected.component.html',
  styleUrl: './autocomplete-selected.component.scss',
})
export class AutocompleteSelected {
  readonly states = STATES.slice(0, 5);
  readonly control = new FormControl('');
  readonly log = signal<string[]>([]);

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.log.update((current) => [...current, event.option.value]);
  }
}
