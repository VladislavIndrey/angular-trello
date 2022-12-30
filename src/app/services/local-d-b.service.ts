import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";


import {Task} from '../models/task.model';
import {List} from '../models/list.model';
import {db} from "./db";


@Injectable({
  providedIn: 'root',
})
export class LocalDBService {
  public getTaskLists(): Observable<List[]> {
    return from(db.taskLists.toArray())
  }

  public getTasks(): Observable<Task[]> {
    return from(db.tasks.toArray());
  }

  public addNewList(title: string): Observable<number> {
    return from(db.taskLists.add({title}));
  }

  public updateList(id: number, title: string): Observable<number> {
    return from(db.taskLists.update(id, {title}));
  }

  public async addTask(task: Task): Promise<void> {
    await db.tasks.add(task)
  }
}
