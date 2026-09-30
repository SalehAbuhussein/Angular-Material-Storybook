import { FocusMonitor, type FocusOrigin } from '@angular/cdk/a11y';
import {
  afterNextRender,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type { Subscription } from 'rxjs';

/** `FocusMonitor` tells you how an element was focused, not only that it was. */
@Component({
  selector: 'demo-focus-monitor',
  imports: [MatButtonModule],
  templateUrl: './focus-monitor.component.html',
  styleUrl: './focus-monitor.component.scss',
})
export class FocusMonitorDemo implements OnInit, OnDestroy {
  readonly _focusMonitor = inject(FocusMonitor);
  readonly _injector = inject(Injector);

  // `read: ElementRef` matters: `matButton` is a component, so without it the
  // query hands back the MatButton instance instead of the DOM element.
  readonly _target = viewChild.required('target', { read: ElementRef<HTMLElement> });
  readonly origin = signal<FocusOrigin>(null);

  _monitored?: HTMLElement;
  _originSub?: Subscription;

  ngOnInit(): void {
    this.initComponent();
  }

  ngOnDestroy(): void {
    this._originSub?.unsubscribe();
    if (this._monitored) this._focusMonitor.stopMonitoring(this._monitored);
  }

  /** Starts watching the button once it has rendered. */
  initComponent(): void {
    afterNextRender(() => this._initFocusMonitor(), { injector: this._injector });
  }

  /** Runs after render, once the view query has a real element to monitor. */
  _initFocusMonitor(): void {
    const element = this._target().nativeElement;
    this._monitored = element;
    this._originSub = this._focusMonitor
      .monitor(element)
      .subscribe((origin) => this.origin.set(origin));
  }
}
