import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FILES } from './menu-data.constants';

/**
 * One menu shared by every row. Each trigger passes its row through
 * `[matMenuTriggerData]`, and the lazy `matMenuContent` template reads it back.
 */
@Component({
  selector: 'demo-menu-data',
  imports: [MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './menu-data.component.html',
})
export class MenuData {
  readonly files = FILES;
  readonly last = signal('none');
}
