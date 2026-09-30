import { SelectionModel } from '@angular/cdk/collections';
import { DecimalPipe } from '@angular/common';
import {
  Component,
  Injector,
  OnInit,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { COLUMNS, NO_MATCH_QUERY, STATUSES } from './data-table-page.constants';
import type { Order } from './data-table-page.types';
import { bulkMessage, filterKey, makeOrders, matchesFilter } from './data-table-page.utils';

/**
 * The full CRUD screen: title, filter bar, bulk actions, a sortable and paged
 * table with row selection, and the empty state you get after filtering
 * everything away.
 */
@Component({
  selector: 'demo-data-table-page',
  imports: [
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule,
    DecimalPipe,
  ],
  templateUrl: './data-table-page.component.html',
  styleUrl: './data-table-page.component.scss',
})
export class DataTablePage implements OnInit {
  readonly height = input(720);
  readonly rowCount = input(48);
  readonly pageSize = input(10);
  readonly loading = input(false);
  /** Start with every row filtered out, to show the empty state. */
  readonly startEmpty = input(false);

  readonly statuses = STATUSES;
  readonly rows = computed(() => makeOrders(this.rowCount()));
  readonly columns = computed(() => COLUMNS);

  readonly dataSource = new MatTableDataSource<Order>([]);
  readonly selection = new SelectionModel<Order>(true, []);

  query = '';
  status = '';

  readonly allSelected = signal(false);
  readonly someSelected = signal(false);

  _snackBar = inject(MatSnackBar);
  _injector = inject(Injector);
  _sort = viewChild(MatSort);
  _paginator = viewChild(MatPaginator);

  ngOnInit(): void {
    this.initComponent();
  }

  /** Sets up filtering, keeps the data in step with the inputs and wires sort and paging. */
  initComponent(): void {
    this._initFilterPredicate();
    this._initRows();
    this._initSortAndPaginator();
  }

  toggleAll(): void {
    const page = this._pageRows();
    if (this.allSelected()) {
      this.selection.deselect(...page);
    } else {
      this.selection.select(...page);
    }
    this._syncHeaderCheckbox();
  }

  applyFilter(): void {
    this.dataSource.filter = filterKey(this.query, this.status);
    this.dataSource.paginator?.firstPage();
    this._syncHeaderCheckbox();
  }

  clearQuery(): void {
    this.query = '';
    this.applyFilter();
  }

  reset(): void {
    this.query = '';
    this.status = '';
    this.applyFilter();
  }

  bulk(message: string): void {
    this._snackBar.open(bulkMessage(message, this.selection.selected.length), 'Undo', { duration: 3000 });
    this.selection.clear();
    this._syncHeaderCheckbox();
  }

  _initFilterPredicate(): void {
    this.dataSource.filterPredicate = matchesFilter;
  }

  _initRows(): void {
    effect(
      () => {
        this.dataSource.data = this.rows();
        this.selection.clear();
        if (this.startEmpty()) {
          this.query = NO_MATCH_QUERY;
        }
        this.applyFilter();
      },
      { injector: this._injector },
    );
  }

  /** viewChild() signals resolve after the first render, so they are wired in an effect. */
  _initSortAndPaginator(): void {
    effect(
      () => {
        const sort = this._sort();
        const paginator = this._paginator();
        if (sort) this.dataSource.sort = sort;
        if (paginator) this.dataSource.paginator = paginator;
      },
      { injector: this._injector },
    );
  }

  /** The header checkbox reflects the rows on the current page only. */
  _pageRows(): Order[] {
    const p = this._paginator();
    const data = this.dataSource.filteredData;
    if (!p) return data;
    const start = p.pageIndex * p.pageSize;
    return data.slice(start, start + p.pageSize);
  }

  _syncHeaderCheckbox(): void {
    const page = this._pageRows();
    const picked = page.filter((r) => this.selection.isSelected(r)).length;
    this.allSelected.set(page.length > 0 && picked === page.length);
    this.someSelected.set(picked > 0 && picked < page.length);
  }
}
