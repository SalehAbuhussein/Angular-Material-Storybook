import { Component, OnInit, computed, input } from '@angular/core';

import {
  BUTTON_ROWS,
  DEFAULT_COLOR,
  FOLDED_BODY_PATH,
  FOLDED_BUTTON_ROWS,
  FULL_VIEW,
  SHIRT_BODY_PATH,
} from './shirt-art.constants';
import { collarShade, fabricBase, fabricStripe, nextArtId } from './shirt-art.utils';
import type { ShirtPose } from './shirt-art.types';

/**
 * A pinstriped blouse drawn in SVG, standing in for product photos. The fabric
 * takes `color`: a light tint for the base, a darker shade for the stripes.
 * `pose` picks the front, the back or the blouse folded flat, and `view`
 * crops the drawing, so a few poses and crops make a full set of shots.
 */
@Component({
  selector: 'demo-shirt-art',
  templateUrl: './shirt-art.component.html',
  styleUrl: './shirt-art.component.scss',
})
export class ShirtArt implements OnInit {
  readonly color = input(DEFAULT_COLOR);
  readonly pose = input<ShirtPose>('front');
  readonly view = input(FULL_VIEW);
  readonly crop = input(false);

  readonly body = SHIRT_BODY_PATH;
  readonly buttons = BUTTON_ROWS;
  readonly foldedBody = FOLDED_BODY_PATH;
  readonly foldedButtons = FOLDED_BUTTON_ROWS;
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
