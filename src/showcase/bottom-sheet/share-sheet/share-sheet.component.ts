import { Component, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import type { ShareData } from '../bottom-sheet.types';

/**
 * The sheet itself. It reads its options from `MAT_BOTTOM_SHEET_DATA` and
 * answers with the id of the option that was picked.
 */
@Component({
  selector: 'docs-share-sheet',
  imports: [MatListModule, MatIconModule],
  templateUrl: './share-sheet.component.html',
  styleUrl: './share-sheet.component.scss',
})
export class ShareSheet {
  readonly _ref = inject<MatBottomSheetRef<ShareSheet, string>>(MatBottomSheetRef);
  readonly data = inject<ShareData>(MAT_BOTTOM_SHEET_DATA);

  /** Closes the sheet with the picked option's id instead of following the link. */
  pick(event: Event, id: string): void {
    event.preventDefault();
    this._ref.dismiss(id);
  }
}
