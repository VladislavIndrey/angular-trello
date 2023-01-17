import {Injectable} from "@angular/core";
import Dexie, {Table} from "dexie";

import {ITask} from "../../../data/db/task";
import {IList} from "../../../data/db/list";

@Injectable({
  providedIn: 'root',
})
export class DbService extends Dexie {
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
