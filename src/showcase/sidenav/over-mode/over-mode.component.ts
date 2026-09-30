import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * The phone layout: an `over` drawer on a backdrop, toggled from a template
 * reference variable, with its open state mirrored into a signal.
 */
@Component({
  selector: 'demo-over-mode',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, MatToolbarModule],
  templateUrl: './over-mode.component.html',
})
export class OverMode {
  readonly isOpen = signal(false);
}
