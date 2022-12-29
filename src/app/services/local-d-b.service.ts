import {Injectable} from '@angular/core';
import {liveQuery} from 'dexie';
import {from, Observable, of} from "rxjs";


import {Task} from '../models/task.model';
import {List} from '../models/list.model';
import {db} from "./db";


@Injectable({
  providedIn: 'root',
})
export class LocalDBService {
  public getTaskLists() : Observable<List[]>{
    return from(db.taskLists.toArray())
  }

  public getTasksByListId(id: number): Observable<Task[]> {
    return from(this.listTasks(id));
  }

  public async addNewList(title: string) {
    await db.taskLists.add({title});
  }

  public async addTask(task: Task): Promise<void> {
    await db.tasks.add(task)
  }

  private async listTasks(id: number): Promise<Task[]> {
    return db.tasks.where({taskListId: id}).toArray();
  }
}
