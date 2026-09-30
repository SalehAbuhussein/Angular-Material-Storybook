import { A11yModule, type FocusOrigin } from '@angular/cdk/a11y';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/** `cdkMonitorSubtreeFocus` reports focus anywhere inside a container. */
@Component({
  selector: 'demo-monitor-subtree',
  imports: [A11yModule, MatButtonModule],
  templateUrl: './monitor-subtree.component.html',
  styleUrl: './monitor-subtree.component.scss',
})
export class MonitorSubtree {
  readonly origin = signal<FocusOrigin>(null);
}
