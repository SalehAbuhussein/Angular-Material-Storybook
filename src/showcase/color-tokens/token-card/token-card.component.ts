import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

import { readCssVariable } from './token-card.utils';

/**
 * A card built only from system variables: no hex, no Material component.
 * It also reads the resolved value of one token after the first render, which
 * is the only safe time to call `getComputedStyle` for a theme value.
 */
@Component({
  selector: 'docs-token-card',
  templateUrl: './token-card.component.html',
  styleUrl: './token-card.component.scss',
})
export class TokenCard implements OnInit {
  readonly resolvedPrimary = signal('');

  readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly _injector = inject(Injector);

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(): void {
    this._initResolvedPrimary();
  }

  /** Reads `--mat-sys-primary` once the card is in the DOM and styled. */
  _initResolvedPrimary(): void {
    afterNextRender(
      () => this.resolvedPrimary.set(readCssVariable(this._host.nativeElement, '--mat-sys-primary')),
      { injector: this._injector },
    );
  }
}
