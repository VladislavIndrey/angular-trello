import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

import { Card } from '../models/card.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class LocalDbService extends Dexie {
  tasks!: Table<Card, number>;
  taskLists!: Table<List, number>;

  constructor() {
    super('trello');
    this.version(3).stores({
      taskLists: '++id',
      tasks: '++id, taskListId',
    });
  }
}
