import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * A live character counter. The value lives in a signal so the hint updates
 * without any change detection tricks.
 */
@Component({
  selector: 'docs-input-counter',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './input-counter.component.html',
  styleUrl: './input-counter.component.scss',
})
export class InputCounter {
  readonly notes = signal('Fixed the date picker on Safari.');
}
