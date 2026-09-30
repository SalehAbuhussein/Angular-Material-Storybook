import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { TOPPINGS } from './select-trigger.constants';

/** A custom trigger renders the closed state however you like. */
@Component({
  selector: 'docs-select-trigger',
  imports: [MatFormFieldModule, MatSelectModule, MatIconModule, FormsModule],
  templateUrl: './select-trigger.component.html',
  styleUrl: './select-trigger.component.scss',
})
export class SelectTrigger {
  readonly toppings = TOPPINGS;
  picked = ['Mozzarella', 'Basil', 'Olives'];
}
