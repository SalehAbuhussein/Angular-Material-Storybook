import { Component, ViewEncapsulation, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import type { Group } from '../utility-classes.types';
import { EXAMPLES } from './class-examples.constants';
import type { RenderedExample } from './class-examples.types';

/**
 * The example cards. Encapsulation is off because the example markup is set
 * with [innerHTML], which Angular's emulated styles never reach. Every rule is
 * scoped under `docs-class-examples` so nothing leaks.
 */
@Component({
  selector: 'docs-class-examples',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './class-examples.component.html',
  styleUrl: './class-examples.component.scss',
})
export class ClassExamples {
  readonly _sanitizer = inject(DomSanitizer);

  readonly group = input.required<Group>();

  // The markup is our own constant, never user input, so trusting it is safe.
  readonly items = computed<RenderedExample[]>(() =>
    EXAMPLES[this.group()].map((e) => ({
      ...e,
      safe: this._sanitizer.bypassSecurityTrustHtml(e.html),
    })),
  );
}
