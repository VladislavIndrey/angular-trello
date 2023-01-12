import Dexie, {Table} from 'dexie';

import {ITask} from "../../../data/db/task";
import {IList} from "../../../data/db/list";

export class AppDB extends Dexie {
  public tasks!: Table<ITask, number>;
  public taskLists!: Table<IList, number>;

  constructor() {
    super('trello');
    this.version(3).stores({
      taskLists: '++id',
      tasks: '++id, taskListId',
    });
  }
}

export const db = new AppDB();
