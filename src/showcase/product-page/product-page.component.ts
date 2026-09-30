import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ShirtArt } from './shirt-art/shirt-art.component';
import {
  BASKET_PREVIEW_COUNT,
  COLORS,
  DESTINATIONS,
  SHOTS,
  SIZES,
  STARTING_BASKET,
} from './product-page.constants';
import type { BasketItem } from './product-page.types';
import { addedMessage, hiddenCount, lastItems, swatchValue, withoutLast } from './product-page.utils';

/**
 * A product page in the style of the Material 3 shopping example. Under 720px
 * of its own width it shows a top bar, a swipeable gallery and a bottom
 * navigation bar. Wider, it switches to a navigation rail with the gallery and
 * the details side by side. The switch is a container query, so it works in
 * any frame.
 */
@Component({
  selector: 'demo-product-page',
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatSnackBarModule,
    ShirtArt,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPage implements OnInit {
  readonly initialSize = input('06');
  readonly showReviews = input(false);

  readonly sizes = SIZES;
  readonly colors = COLORS;
  readonly destinations = DESTINATIONS;
  readonly shots = SHOTS;

  readonly section = signal('Featured');
  readonly size = signal('');
  readonly color = signal('Peach');
  readonly favourite = signal(false);
  readonly basket = signal<BasketItem[]>([]);

  readonly basketPreview = computed(() => lastItems(this.basket(), BASKET_PREVIEW_COUNT));
  readonly basketExtra = computed(() => hiddenCount(this.basket(), BASKET_PREVIEW_COUNT));
  readonly swatchOf = (name: string) => swatchValue(COLORS, name);

  _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Sets the starting selection and fills the basket with its sample items. */
  initComponent(): void {
    this._initSelection();
    this._initBasket();
  }

  /** Adds the chosen size and colour to the basket and offers an Undo. */
  add(): void {
    const item: BasketItem = { size: this.size(), color: this.color() };
    this.basket.update((items) => [...items, item]);
    this._offerUndo(item);
  }

  _initSelection(): void {
    this.size.set(this.initialSize());
  }

  _initBasket(): void {
    this.basket.set([...STARTING_BASKET]);
  }

  _offerUndo(item: BasketItem): void {
    this._snackBar
      .open(addedMessage(item), 'Undo', { duration: 3000 })
      .onAction()
      .subscribe(() => this.basket.update(withoutLast));
  }
}
