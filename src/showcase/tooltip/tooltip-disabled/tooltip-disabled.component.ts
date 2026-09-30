import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

/** Toggling `matTooltipDisabled` from a signal, the usual way to switch a hint off. */
@Component({
  selector: 'docs-tooltip-disabled',
  imports: [MatTooltipModule, MatButtonModule],
  templateUrl: './tooltip-disabled.component.html',
})
export class TooltipDisabled {
  readonly dirty = signal(true);
}
