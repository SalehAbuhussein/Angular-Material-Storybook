import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { Stamp } from '../stamp/stamp.component';

/** One eager tab and one lazy tab, each stamped with the time it was built. */
@Component({
  selector: 'demo-lazy-tabs',
  imports: [MatTabsModule, Stamp],
  templateUrl: './lazy-tabs.component.html',
})
export class LazyTabs {}
