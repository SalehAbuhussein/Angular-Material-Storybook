import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { STARTING_TABS } from './dynamic-tabs.constants';
import type { QueryTab } from './dynamic-tabs.types';
import { queryTab, withoutTab } from './dynamic-tabs.utils';

/** Tabs built from a signal, with buttons to add and close them. */
@Component({
  selector: 'demo-dynamic-tabs',
  imports: [MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './dynamic-tabs.component.html',
})
export class DynamicTabs implements OnInit {
  readonly tabs = signal<QueryTab[]>([]);
  readonly selected = signal(0);

  _nextId = 0;

  ngOnInit(): void {
    this.initComponent();
  }

  /** Opens the starting tabs. */
  initComponent(): void {
    this._initTabs();
  }

  /** Adds a tab at the end and selects it. */
  add(): void {
    const id = this._nextId++;
    this.tabs.update((tabs) => [...tabs, queryTab(id)]);
    this.selected.set(this.tabs().length - 1);
  }

  /** Closes a tab and keeps the selected index inside the remaining tabs. */
  remove(id: number): void {
    this.tabs.update((tabs) => withoutTab(tabs, id));
    this.selected.update((index) => Math.min(index, this.tabs().length - 1));
  }

  _initTabs(): void {
    this.tabs.set([...STARTING_TABS]);
    this._nextId = STARTING_TABS.length + 1;
  }
}
