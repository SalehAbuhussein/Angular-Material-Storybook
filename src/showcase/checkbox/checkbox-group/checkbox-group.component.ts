import { Component, OnInit, computed, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { STARTING_TOPICS } from './checkbox-group.constants';
import type { Topic } from './checkbox-group.types';
import { allOn, someOn, withAll, withTopic } from './checkbox-group.utils';

/**
 * A parent checkbox that is checked when every child is, indeterminate when
 * some are, and unchecked when none are.
 */
@Component({
  selector: 'docs-checkbox-group',
  imports: [MatCheckboxModule],
  templateUrl: './checkbox-group.component.html',
  styleUrl: './checkbox-group.component.scss',
})
export class CheckboxGroup implements OnInit {
  readonly topics = signal<Topic[]>([]);

  readonly allChecked = computed(() => allOn(this.topics()));
  readonly someChecked = computed(() => someOn(this.topics()));

  ngOnInit(): void {
    this.initComponent();
  }

  /** Fills the list with its sample topics. */
  initComponent(): void {
    this._initTopics();
  }

  toggle(id: string, on: boolean): void {
    this.topics.update((list) => withTopic(list, id, on));
  }

  setAll(on: boolean): void {
    this.topics.update((list) => withAll(list, on));
  }

  _initTopics(): void {
    this.topics.set([...STARTING_TOPICS]);
  }
}
