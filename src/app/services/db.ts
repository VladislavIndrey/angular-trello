import Dexie, { Table } from 'dexie';
import {Task} from "../models/task.model";
import {List} from "../models/list.model";

export class AppDB extends Dexie {
  public tasks!: Table<Task, number>;
  public taskLists!: Table<List, number>;

  constructor() {
    super('trello');
    this.version(3).stores({
      taskLists: '++id',
      tasks: '++id, taskListId',
    });
    this.on('populate', () => this.populate());
  }

  // TODO: Delete on production
  private async populate() {
    const taskListId = await db.taskLists.add({
      title: 'Todo Today',
    });
    await db.tasks.add({listId: taskListId, text: 'Test text', ownerName: 'Sample owner', priority: 0});

    const taskListId2 = await db.taskLists.add({
      title: 'Done',
    });
    await db.tasks.add({listId: taskListId2, text: 'Done text', ownerName: 'Sample owner', priority: 0});
  }
}

export const db = new AppDB();
