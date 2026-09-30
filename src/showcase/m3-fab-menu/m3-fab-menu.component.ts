import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { DEFAULT_ACTIONS } from './m3-fab-menu.constants';
import type { FabAction, FabColor } from './m3-fab-menu.types';
import { createdMessage, wrapIndex } from './m3-fab-menu.utils';

/**
 * The M3 FAB menu. The FAB morphs into a round close button and up to six
 * related actions rise out of it, one after another. It replaces the old
 * "speed dial" pattern.
 *
 * Keyboard: Enter opens it and moves focus to the first action, arrow keys
 * move between actions, Escape closes it and puts focus back on the FAB.
 */
@Component({
  selector: 'm3-fab-menu',
  imports: [MatIconModule, MatRippleModule, MatSnackBarModule],
  templateUrl: './m3-fab-menu.component.html',
  styleUrl: './m3-fab-menu.component.scss',
})
export class FabMenu {
  _snackBar = inject(MatSnackBar);
  _fab = viewChild.required<ElementRef<HTMLButtonElement>>('fab');

  readonly color = input<FabColor>('primary');
  readonly actions = input<FabAction[]>(DEFAULT_ACTIONS);

  readonly open = signal(false);

  /** Opens the menu and moves focus to the first action. */
  show(): void {
    this.open.set(true);
    // Wait one frame so the items are focusable before moving focus.
    requestAnimationFrame(() => this._items()[0]?.focus());
  }

  /** Closes the menu and puts focus back on the FAB. */
  close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this._fab().nativeElement.focus();
  }

  pick(label: string): void {
    this.close();
    this._snackBar.open(createdMessage(label), undefined, { duration: 1600 });
  }

  /** Moves focus to the next or previous action, wrapping at the ends. */
  move(event: Event, step: number): void {
    event.preventDefault();
    const items = this._items();
    const i = items.indexOf(event.target as HTMLButtonElement);
    items[wrapIndex(i, step, items.length)]?.focus();
  }

  _items(): HTMLButtonElement[] {
    return Array.from(this._fab().nativeElement.parentElement!.querySelectorAll<HTMLButtonElement>('.item'));
  }
}
