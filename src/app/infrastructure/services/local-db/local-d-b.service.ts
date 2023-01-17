import {Injectable} from '@angular/core';
import {delay, from, map, Observable, of, zip} from "rxjs";
import {Table} from "dexie";

import {ITask} from '../../../data/db/task';
import {IList} from '../../../data/db/list';
import {IDBNode} from "../../../data/db/db-node";
import {DbService} from "./db.service";


@Injectable({
  providedIn: 'root',
})
export class LocalDBService {

  constructor(private db: DbService) {
  }

  public getTaskLists(): Observable<IList[]> {
    return from(this.db.taskLists.toArray())
  }

  public getTasks(): Observable<ITask[]> {
    return from(this.db.tasks.toArray());
  }

  public addTask(task: ITask): Observable<[number, ITask[]]> {
    return zip(from(this.db.tasks.add(task)), from(this.db.tasks.toArray()));
  }

  public addTaskAfter(prevTask: ITask, newTask: ITask): Observable<ITask[]> {
    return this.addNodeAfter<ITask>(this.db.tasks, prevTask, newTask);
  }

  public addListAfter(prevList: IList, newList: IList): Observable<IList[]> {
    return this.addNodeAfter<IList>(this.db.taskLists, prevList, newList);
  }

  public deleteTask(id: number): Observable<[void, ITask[]]> {
    return zip(this.db.tasks.delete(id), this.db.tasks.toArray());
  }

  public updateTask(id: number, task: ITask): Observable<[number, ITask[]]> {
    return zip(this.db.tasks.update(id, task), this.getTasks());
  }

  public addNewList(list: IList): Observable<[number, IList[]]> {
    return zip(this.db.taskLists.add(list), this.db.taskLists.toArray());
  }

  public deleteListById(id: number): Observable<[void, number, IList[]]> {
    return zip(
      this.db.taskLists.delete(id),
      this.db.tasks.where({taskListId: id}).delete(),
      this.db.taskLists.toArray()
    );
  }

  public updateList(id: number, list: IList): Observable<[number, IList[]]> {
    return zip(this.db.taskLists.update(id, list), this.db.taskLists.toArray());
  }

  public moveTask(prevTask: ITask | undefined, nextTask: ITask | undefined, taskToMove: ITask): Observable<ITask[]> {
    return this.moveNode<ITask>(this.db.tasks, prevTask, nextTask, taskToMove);
  }

  private moveNode<T extends IDBNode>(
    table: Table<T, number>,
    prevNode: T | undefined,
    nextNode: T | undefined,
    nodeToMove: T,
  ): Observable<T[]> {
    if (prevNode === undefined && nextNode === undefined) {
      throw new Error('[Move Node] Both nodes are undefined!');
    }

    return zip(
      this.updateNode<T>(table, prevNode).pipe(delay(3)),
      this.updateNode(table, nextNode),
      this.updateNode(table, nodeToMove),
      table.toArray(),
    ).pipe(
      map(([, , , data]) => data),
    );
  }

  private updateNode<T extends IDBNode>(table: Table<T, number>, node: T | undefined): Observable<number> {
    if (node === undefined) {
      return of(-1);
    }

    if (node.id === undefined) {
      throw new Error('[Update Node] Node id is undefined!');
    }

    return from(table.update(node.id, node));
  }


  private addNodeAfter<T extends IDBNode>(table: Table<T, number>, prevNode: T, newNode: T): Observable<T[]> {
    if (prevNode.id === undefined) {
      throw new Error('[Add Node After] Previous Node Id is Undefined!');
    }

    return zip(
      table.update(prevNode.id, {nextId: prevNode.id + 1}),
      table.add({...newNode, prevId: prevNode.id}),
      table.toArray(),
    ).pipe(map(([, , data]) => data));
  }
}
