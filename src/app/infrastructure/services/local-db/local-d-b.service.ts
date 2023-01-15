import {Injectable} from '@angular/core';
import {combineLatest, from, map, Observable, zip} from "rxjs";


import {ITask} from '../../../data/db/task';
import {IList} from '../../../data/db/list';
import {db} from "./db";


@Injectable({
  providedIn: 'root',
})
export class LocalDBService {
  public getTaskLists(): Observable<IList[]> {
    return from(db.taskLists.toArray())
  }

  public getTasks(): Observable<ITask[]> {
    return from(db.tasks.toArray());
  }

  public addTask(task: ITask): Observable<[number, ITask[]]> {
    return zip(from(db.tasks.add(task)), from(db.tasks.toArray()));
  }

  public addTaskAfter(prevTask: ITask, newTask: ITask): Observable<ITask[]> {
    if (prevTask.id === undefined) {
      throw new Error('[Add Task After] Previous Task Id is Undefined!');
    }

    return zip(db.tasks.update(prevTask.id, {nextId: prevTask.id + 1}),
      db.tasks.add({...newTask, prevId: prevTask.id}),
      db.tasks.toArray(),
    ).pipe(map(([,,data]) => data));
  }

  public deleteTask(id: number): Observable<[void, ITask[]]> {
    return zip(db.tasks.delete(id), db.tasks.toArray());
  }

  public updateTask(id: number, task: ITask): Observable<[number, ITask[]]> {
    return zip(db.tasks.update(id, task), this.getTasks());
  }

  public addNewList(list: IList): Observable<[number, IList[]]> {
    return zip(db.taskLists.add(list), db.taskLists.toArray());
  }

  public deleteListById(id: number): Observable<[void, number, IList[]]> {
    return zip(
      db.taskLists.delete(id),
      db.tasks.where({taskListId: id}).delete(),
      db.taskLists.toArray()
    );
  }

  public updateList(id: number, list: IList): Observable<[number, IList[]]> {
    return zip(db.taskLists.update(id, list), db.taskLists.toArray());
  }

  public moveTask(previousTask: ITask, currentTask: ITask): Observable<[void, void, number, number, ITask[]]> {
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
