import { Component, input, linkedSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

import { VIEWS } from './m3-button-group.constants';
import type { ButtonGroupSize, ButtonGroupVariant, GroupItem } from './m3-button-group.types';
import { isSelected, toggleId } from './m3-button-group.utils';

/**
 * The M3 button group. Two shapes of group:
 *
 * - standard: buttons with a gap. Pressing one makes it wider and squarer, and
 *   squeezes its neighbours, so the press reads across the whole group.
 * - connected: buttons 2px apart with small inner corners. The selected one
 *   turns into a full pill.
 *
 * Every button is a native `<button aria-pressed>`, so it is a toggle for
 * screen readers and keyboard users with no extra code.
 */
@Component({
  selector: 'm3-button-group',
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './m3-button-group.component.html',
  styleUrl: './m3-button-group.component.scss',
})
export class ButtonGroup {
  readonly items = input<GroupItem[]>(VIEWS);
  readonly variant = input<ButtonGroupVariant>('standard');
  readonly size = input<ButtonGroupSize>('md');
  readonly multiple = input(false);
  readonly iconOnly = input(false);
  readonly label = input('Options');
  readonly initial = input<string[]>([]);

  readonly selected = linkedSignal(() => this.initial());

  readonly isOn = (id: string) => isSelected(this.selected(), id);

  /** Flips a button in multiple mode; in single mode, selects it. */
  toggle(id: string): void {
    if (this.multiple()) {
      this.selected.update((s) => toggleId(s, id));
    } else {
      // Single select: tapping the selected one again keeps it, like a radio.
      this.selected.set([id]);
    }
  }
}
