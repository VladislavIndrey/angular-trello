import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

import { Task } from '../models/task.model';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class LocalDbService extends Dexie {
  tasks!: Table<Task, number>;
  taskLists!: Table<List, number>;

  constructor() {
    super('trello');
    this.version(3).stores({
      taskLists: '++id',
      tasks: '++id, taskListId',
    });
  }

  // TODO:  liveQuery<> return observable<> https://dexie.org/docs/Tutorial/Angular (get)
  // TODO: async db.add()
}
