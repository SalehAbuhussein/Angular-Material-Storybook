import { moveItemInArray, transferArrayItem, type CdkDragDrop } from '@angular/cdk/drag-drop';

/** A copy of `items` with one entry moved, leaving the original untouched. */
export const reordered = <T>(items: T[], from: number, to: number): T[] => {
  const next = [...items];
  moveItemInArray(next, from, to);
  return next;
};

/**
 * Moves the dropped item inside its list or across to the target list. Both
 * helpers mutate the `cdkDropListData` arrays in place.
 */
export const applyDrop = <T>(event: CdkDragDrop<T[]>): void => {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
};
