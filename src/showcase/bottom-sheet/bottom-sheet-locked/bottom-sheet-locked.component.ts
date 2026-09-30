import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

import { TARGETS } from '../bottom-sheet.constants';
import type { ShareData } from '../bottom-sheet.types';
import { ShareSheet } from '../share-sheet/share-sheet.component';

/** A sheet the user cannot dismiss by tapping outside. */
@Component({
  selector: 'docs-bottom-sheet-locked',
  imports: [MatButtonModule],
  templateUrl: './bottom-sheet-locked.component.html',
})
export class BottomSheetLocked {
  readonly _bottomSheet = inject(MatBottomSheet);

  open(): void {
    this._bottomSheet.open<ShareSheet, ShareData, string>(ShareSheet, {
      data: { fileName: 'contract.pdf', targets: TARGETS },
      disableClose: true,
      ariaLabel: 'Share options',
    });
  }
}
