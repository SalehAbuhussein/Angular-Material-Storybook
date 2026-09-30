import { Component, OnInit, computed, input } from '@angular/core';

import { BUTTON_ROWS, DEFAULT_COLOR, FULL_VIEW, SHIRT_BODY_PATH } from './shirt-art.constants';
import { collarShade, fabricBase, fabricStripe, nextArtId } from './shirt-art.utils';

/**
 * A pinstriped blouse drawn in SVG, standing in for product photos. The fabric
 * takes `color`: a light tint for the base, a darker shade for the stripes.
 * `view` crops the drawing, which is how one drawing becomes three shots.
 */
@Component({
  selector: 'demo-shirt-art',
  templateUrl: './shirt-art.component.html',
  styleUrl: './shirt-art.component.scss',
})
export class ShirtArt implements OnInit {
  readonly color = input(DEFAULT_COLOR);
  readonly view = input(FULL_VIEW);
  readonly crop = input(false);

  readonly body = SHIRT_BODY_PATH;
  readonly buttons = BUTTON_ROWS;
  patternId = '';

  readonly base = computed(() => fabricBase(this.color()));
  readonly stripe = computed(() => fabricStripe(this.color()));
  readonly inside = computed(() => collarShade(this.color()));

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(): void {
    this._initPatternId();
  }

  /**
   * SVG `url(#id)` looks ids up across the whole page, so two drawings with
   * the same pattern id would both paint in the first one's colour.
   */
  _initPatternId(): void {
    this.patternId = nextArtId();
  }
}
