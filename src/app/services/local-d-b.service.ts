import {Injectable} from '@angular/core';
import Dexie, {liveQuery, Table, Observable} from 'dexie';

import {Task} from '../models/task.model';
import {List} from '../models/list.model';


@Injectable({
  providedIn: 'root',
})
export class LocalDBService extends Dexie {
  private _tasks!: Table<Task, number>;
  private _taskLists!: Table<List, number>;

  constructor() {
    super('trello');
    this.version(3).stores({
      taskLists: '++id',
      tasks: '++id, taskListId',
    });
  }

  public getTaskLists(): Observable<List[]> {
    return liveQuery(() => this._taskLists.toArray());
  }

  public async addNewList(title: string): Promise<void> {
    await this._taskLists.add({title});
  }

  public async addTask(task: Task): Promise<void> {
    await this._tasks.add(task)
  }

  public getTasksByListId(id: number) {
    return liveQuery(() => this.listTasks(id));
  }

  private async listTasks(id: number) {
    return this._tasks.where({taskListId: id}).toArray();
  }
}
