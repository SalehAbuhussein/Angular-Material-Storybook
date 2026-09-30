import { Component, computed, input } from '@angular/core';

import { SAMPLE_TEXT } from './utility-classes.constants';
import { classList, markupSnippet, pairWarningFor } from './utility-classes.utils';

/**
 * One element with the picked classes on it, the HTML to copy, and a warning
 * when the text class does not match the background's on-* partner. Every
 * input takes a full class name, such as `mat-bg-primary`, or '' for none.
 */
@Component({
  selector: 'docs-class-playground',
  templateUrl: './utility-classes.component.html',
  styleUrl: './utility-classes.component.scss',
})
export class UtilityClasses {
  readonly bg = input('');
  readonly textColor = input('');
  readonly font = input('');
  readonly corner = input('');
  readonly border = input('');
  readonly shadow = input('');
  readonly text = input(SAMPLE_TEXT);

  readonly classes = computed(() =>
    classList([this.bg(), this.textColor(), this.font(), this.corner(), this.border(), this.shadow()]),
  );

  readonly html = computed(() => markupSnippet(this.classes(), this.text()));

  readonly pairWarning = computed(() => pairWarningFor(this.bg(), this.textColor()));
}
