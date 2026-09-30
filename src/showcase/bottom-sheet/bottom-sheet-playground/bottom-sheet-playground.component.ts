import { Component, inject, input, signal } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

import { TARGETS } from '../bottom-sheet.constants';
import type { ShareData } from '../bottom-sheet.types';
import { ShareSheet } from '../share-sheet/share-sheet.component';

/** Playground trigger. Config comes from the controls panel. */
@Component({
  selector: 'docs-bottom-sheet-playground',
  imports: [MatButtonModule],
  templateUrl: './bottom-sheet-playground.component.html',
})
export class BottomSheetPlayground {
  readonly _bottomSheet = inject(MatBottomSheet);

  readonly disableClose = input(false);
  readonly hasBackdrop = input(true);
  readonly ariaLabel = input('Share options');

  readonly picked = signal<string | undefined>(undefined);

  /** Opens the share sheet with the current control values and records the pick. */
  open(): void {
    const ref = this._bottomSheet.open<ShareSheet, ShareData, string>(ShareSheet, {
      data: { fileName: 'report-q3.pdf', targets: TARGETS },
      disableClose: this.disableClose(),
      hasBackdrop: this.hasBackdrop(),
      ariaLabel: this.ariaLabel(),
    });

    // afterDismissed() emits once and completes, so there is nothing to unsubscribe.
    ref.afterDismissed().subscribe((value) => this.picked.set(value));
  }
}
