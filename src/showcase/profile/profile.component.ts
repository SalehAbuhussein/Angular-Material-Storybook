import { Component, computed, inject, input, signal, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ACTIVITY, BASE_FOLLOWERS, PROJECTS } from './profile.constants';
import { followerCount, initialsOf } from './profile.utils';

/**
 * A profile screen: an identity header, tabs for the sections, an editable
 * details card, and an activity feed.
 */
@Component({
  selector: 'demo-profile',
  imports: [
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class Profile {
  readonly _fb = inject(FormBuilder);
  readonly _snackBar = inject(MatSnackBar);

  readonly height = input(760);
  /** Open the details card straight into edit mode. */
  readonly startEditing = input(false);

  readonly activity = ACTIVITY;
  readonly projects = PROJECTS;

  // linkedSignal, not signal: it re-derives whenever the input changes, so the
  // Storybook control keeps working after the first render, and it stays
  // writable, so clicking inside the screen still works too.
  readonly editing = linkedSignal(() => this.startEditing());
  readonly following = signal(false);

  readonly form = this._fb.nonNullable.group({
    name: ['Saleh Al-Khatib', [Validators.required]],
    title: ['Senior frontend engineer', []],
    location: ['Amman, Jordan', []],
    bio: ['Building design systems in Angular. Fond of tokens, suspicious of magic numbers.', []],
  });

  readonly _events = toSignal(this.form.events, { initialValue: null });
  _snapshot = this.form.getRawValue();

  readonly name = computed(() => {
    this._events();
    return this.form.getRawValue().name;
  });

  readonly initials = computed(() => initialsOf(this.name()));
  readonly followers = computed(() => followerCount(BASE_FOLLOWERS, this.following()));

  /** Remembers the current values so Cancel can put them back. */
  startEdit(): void {
    this._snapshot = this.form.getRawValue();
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.form.setValue(this._snapshot);
    this.editing.set(false);
  }

  saveEdit(): void {
    if (this.form.invalid) return;
    this._snapshot = this.form.getRawValue();
    this.editing.set(false);
    this._snackBar.open('Profile updated', undefined, { duration: 2200 });
  }

  toggleFollow(): void {
    this.following.update((v) => !v);
  }
}
