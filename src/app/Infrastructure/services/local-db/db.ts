import Dexie, {Table} from 'dexie';

import {Task} from "../../../data/db/task";
import {List} from "../../../data/db/list";

export class AppDB extends Dexie {
  public tasks!: Table<Task, number>;
  public taskLists!: Table<List, number>;

  constructor() {
    super('trello');
    this.version(3).stores({
      taskLists: '++id',
      tasks: '++id, taskListId',
    });
  }
}

export const db = new AppDB();
