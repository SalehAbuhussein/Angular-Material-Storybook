import { Component, inject, signal } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

import { TARGETS } from '../bottom-sheet.constants';
import type { ShareData } from '../bottom-sheet.types';
import { ShareSheet } from '../share-sheet/share-sheet.component';
import { resultMessage } from './bottom-sheet-result.utils';

/** Data in through `data`, the answer back out of `afterDismissed()`. */
@Component({
  selector: 'docs-bottom-sheet-result',
  imports: [MatButtonModule],
  templateUrl: './bottom-sheet-result.component.html',
})
export class BottomSheetResult {
  readonly _bottomSheet = inject(MatBottomSheet);
  readonly status = signal('No action chosen.');

  /** Opens the share sheet and reports what the user picked, or that they dismissed it. */
  open(): void {
    const ref = this._bottomSheet.open<ShareSheet, ShareData, string>(ShareSheet, {
      data: { fileName: 'invoice-4821.pdf', targets: TARGETS },
      ariaLabel: 'Share options',
    });

    ref.afterDismissed().subscribe((id) => this.status.set(resultMessage(id)));
  }
}
