import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DIGEST_DAYS, SECTIONS } from './settings-page.constants';

/**
 * A settings screen: section navigation on the left, one form on the right, and
 * a save bar that only appears once something has actually changed.
 */
@Component({
  selector: 'demo-settings-page',
  imports: [
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPage {
  _fb = inject(FormBuilder);
  _snackBar = inject(MatSnackBar);

  readonly height = input(680);
  readonly initialSection = input<string>('profile');
  /** Stack the nav above the content instead of beside it. */
  readonly stacked = input(false);

  readonly sections = SECTIONS;
  readonly days = DIGEST_DAYS;
  // linkedSignal, not signal: it re-derives whenever the input changes, so the
  // Storybook control keeps working after the first render, and it stays
  // writable, so clicking inside the screen still works too.
  readonly active = linkedSignal(() => this.initialSection());

  readonly form = this._fb.nonNullable.group({
    name: ['Saleh Al-Khatib', [Validators.required]],
    email: ['saleh@example.com', [Validators.email]],
    bio: ['Frontend engineer. Angular, design systems, too much coffee.'],
    emailDigest: [true],
    mentions: [true],
    deploys: [false],
    digestDay: ['Monday'],
    scheme: ['system'],
    density: [0],
    reduceMotion: [false],
    twoFactor: [true],
    timeout: [60],
  });

  _status = toSignal(this.form.events, { initialValue: null });
  /** Drives the save bar. `dirty` flips the first time any control changes. */
  readonly dirty = computed(() => {
    this._status();
    return this.form.dirty;
  });

  select(event: Event, id: string): void {
    event.preventDefault();
    this.active.set(id);
  }

  save(): void {
    if (this.form.invalid) return;
    this.form.markAsPristine();
    this._snackBar.open('Settings saved', undefined, { duration: 2500 });
  }

  /** Keeps the current values but clears the dirty flag, which hides the save bar. */
  discard(): void {
    this.form.reset(this.form.getRawValue());
    this.form.markAsPristine();
  }
}
