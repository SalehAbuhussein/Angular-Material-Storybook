import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';

import { HIGH_CONTRAST_LABELS } from './high-contrast.constants';

/** Report the browser's high contrast mode as the CDK detects it. */
@Component({
  selector: 'demo-high-contrast',
  templateUrl: './high-contrast.component.html',
  styleUrl: './high-contrast.component.scss',
})
export class HighContrast {
  readonly _detector = inject(HighContrastModeDetector);

  readonly label = HIGH_CONTRAST_LABELS[this._detector.getHighContrastMode()];
}
