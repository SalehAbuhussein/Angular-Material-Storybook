import type { ConnectedPosition } from '@angular/cdk/overlay';

import { POSITIONS } from './overlay-playground.constants';

/** The named position set, falling back to "below" for an unknown name. */
export const positionsFor = (name: string): ConnectedPosition[] => POSITIONS[name] ?? POSITIONS['below'];
