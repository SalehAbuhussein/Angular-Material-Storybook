import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

import { TARGETS } from '../bottom-sheet.constants';
import { ShareSheet } from '../share-sheet/share-sheet.component';

/** The plainest possible call: open a component, ignore the result. */
@Component({
  selector: 'docs-bottom-sheet-basic',
  imports: [MatButtonModule],
  templateUrl: './bottom-sheet-basic.component.html',
})
export class BottomSheetBasic {
  readonly _bottomSheet = inject(MatBottomSheet);

  open(): void {
    this._bottomSheet.open(ShareSheet, {
      data: { fileName: 'notes.txt', targets: TARGETS },
      ariaLabel: 'Share options',
    });
  }
}
