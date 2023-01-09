import {Injectable} from '@angular/core';
import {from, Observable, zip} from "rxjs";


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

  public deleteListById(id: number): Observable<[void, number]> {
    return zip(from(db.taskLists.delete(id)), from(db.tasks.where({taskListId: id}).delete()));
  }

  public updateList(id: number, title: string): Observable<number> {
    return from(db.taskLists.update(id, {title}));
  }

  public addTask(task: Task): Observable<number> {
    return from(db.tasks.add(task));
  }

  // TODO: Get new tasks on delete
  public deleteTask(id: number): Observable<void> {
    return from(db.tasks.delete(id));
  }

  public updateTask(id: number, task: Task): Observable<[number, Task[]]> {
    return zip(from(db.tasks.update(id, task)), this.getTasks());
  }
}
