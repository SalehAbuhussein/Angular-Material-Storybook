import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { ICON_NAMESPACE, LEAF_SVG, SPARK_SVG } from './icon-svg.constants';

/**
 * Registers two SVG icons with `MatIconRegistry`, then renders them by name.
 * `addSvgIconLiteral` keeps the markup inline; `addSvgIcon` fetches a URL and
 * needs `provideHttpClient()` in your app config.
 */
@Component({
  selector: 'docs-icon-svg',
  imports: [MatIconModule],
  templateUrl: './icon-svg.component.html',
})
export class IconSvg {
  _registry = inject(MatIconRegistry);
  _sanitizer = inject(DomSanitizer);

  /**
   * Registration has to happen here, not in ngOnInit. `svgIcon="docs:leaf"` is
   * a static attribute, and Angular applies static inputs while it creates the
   * child <mat-icon>, which is before this component's ngOnInit runs.
   */
  constructor() {
    this._initIcons();
  }

  _initIcons(): void {
    this._register('leaf', LEAF_SVG);
    this._register('spark', SPARK_SVG);
  }

  _register(name: string, svg: string): void {
    this._registry.addSvgIconLiteralInNamespace(
      ICON_NAMESPACE,
      name,
      this._sanitizer.bypassSecurityTrustHtml(svg),
    );
  }
}
