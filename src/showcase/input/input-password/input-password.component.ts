import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * A password field whose visibility toggles. `type` is bound, so the same
 * `matInput` swaps between `password` and `text`.
 */
@Component({
  selector: 'docs-input-password',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
})
export class InputPassword {
  readonly hidden = signal(true);
}
