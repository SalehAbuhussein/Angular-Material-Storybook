import {
  createBlockScrollStrategy,
  createCloseScrollStrategy,
  createRepositionScrollStrategy,
  type ScrollStrategy,
} from '@angular/cdk/overlay';
import type { Injector } from '@angular/core';

import type { ScrollKind } from './overlay-scroll.types';

export function createScrollStrategy(kind: ScrollKind, injector: Injector): ScrollStrategy {
  return kind === 'reposition'
    ? createRepositionScrollStrategy(injector)
    : kind === 'close'
      ? createCloseScrollStrategy(injector)
      : createBlockScrollStrategy(injector);
}
