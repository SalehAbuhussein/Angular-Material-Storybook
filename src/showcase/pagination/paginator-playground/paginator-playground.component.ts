import { Component, input, signal } from '@angular/core';
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';

/** A paginator on its own, with every input exposed to the controls panel. */
@Component({
  selector: 'demo-paginator-playground',
  imports: [MatPaginatorModule],
  templateUrl: './paginator-playground.component.html',
  styleUrl: './paginator-playground.component.scss',
})
export class PaginatorPlayground {
  readonly length = input(200);
  readonly pageSize = input(10);
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 100]);
  readonly hidePageSize = input(false);
  readonly showFirstLastButtons = input(true);
  readonly disabled = input(false);

  readonly last = signal<PageEvent | null>(null);
}
