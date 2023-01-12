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

  public addTask(task: Task): Observable<[number, Task[]]> {
    return zip(from(db.tasks.add(task)), from(db.tasks.toArray()));
  }

  public deleteTask(id: number): Observable<[void, Task[]]> {
    return zip(db.tasks.delete(id), db.tasks.toArray());
  }

  public updateTask(id: number, task: Task): Observable<[number, Task[]]> {
    return zip(db.tasks.update(id, task), this.getTasks());
  }

  public addNewList(list: List): Observable<[number, List[]]> {
    return zip(db.taskLists.add(list), db.taskLists.toArray());
  }

  public deleteListById(id: number): Observable<[void, number, List[]]> {
    return zip(
      db.taskLists.delete(id),
      db.tasks.where({taskListId: id}).delete(),
      db.taskLists.toArray()
    );
  }

  public updateList(id: number, list: List): Observable<[number, List[]]> {
    return zip(db.taskLists.update(id, list), db.taskLists.toArray());
  }

  public moveTask(previousTask: Task, currentTask: Task): Observable<[void, void, number, number, Task[]]> {
    if (previousTask.id === undefined || currentTask.id === undefined) {
      throw new Error('One of tasks id is undefined');
    }

    return zip(
      db.tasks.delete(previousTask.id),
      db.tasks.delete(currentTask.id),
      db.tasks.add({
        ...previousTask,
        text: currentTask.text,
        ownerName: currentTask.ownerName,
        priority: currentTask.priority
      }),
      db.tasks.add({
        ...currentTask,
        text: previousTask.text,
        ownerName: previousTask.ownerName,
        priority: previousTask.priority
      }),
      this.getTasks(),
    );
  }
}
