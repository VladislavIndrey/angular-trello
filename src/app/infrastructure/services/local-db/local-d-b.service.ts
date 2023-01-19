import {Injectable} from '@angular/core';
import {Table} from "dexie";
import {
  firstValueFrom,
  from,
  Observable,
  of,
  switchMap,
  zip,
} from "rxjs";

import {ITask} from '../../../data/db/task';
import {IList} from '../../../data/db/list';
import {IDBNode} from "../../../data/db/db-node";

import {DbService} from "./db.service";
import {sortNodes} from "../../../utils/nodes-utils";


@Injectable({
  providedIn: 'root',
})
export class LocalDBService {

  constructor(private db: DbService) {
  }

  public getLists(): Observable<IList[]> {
    return from(this.db.taskLists.toArray());
    return of([]);
  }

  public getTasks(): Observable<ITask[]> {
    return from(this.db.tasks.toArray());
  }

  public addTask(task: ITask): Observable<ITask[]> {
    return from(this.db.tasks.toArray()).pipe(
      switchMap((elements) => {
        const tasks = elements.filter((element) => element.taskListId === task.taskListId);
        return firstValueFrom(this.addNodeAt<ITask>(this.db.tasks, task, tasks, tasks.length - 1));
      })
    );
  }

  public deleteTask(task: ITask): Observable<ITask[]> {
    return from(this.db.tasks.toArray()).pipe(
      switchMap(async (elements) => {
        const tasks = elements.filter((element) => element.taskListId === task.taskListId);
        return firstValueFrom(this.deleteNode<ITask>(this.db.tasks, task, tasks));
      })
    );
  }

  public updateTask(id: number, task: ITask): Observable<[number, ITask[]]> {
    return zip(this.db.tasks.update(id, task), this.getTasks());
  }

  public addList(list: IList): Observable<IList[]> {
    return from(this.db.taskLists.toArray()).pipe(
      switchMap((elements) => {
        return firstValueFrom(this.addNodeAt<IList>(this.db.taskLists, list, elements, elements.length - 1));
      })
    );
  }

  public deleteList(list: IList): Observable<IList[]> {
    return from(this.db.taskLists.toArray()).pipe(
      switchMap(async (elements) => {
        return firstValueFrom(this.deleteNode<IList>(this.db.taskLists, list, elements));
      })
    );
  }

  public updateList(id: number, list: IList): Observable<[number, IList[]]> {
    return zip(this.db.taskLists.update(id, list), this.db.taskLists.toArray());
  }

  public moveTask(task: ITask, currentIndex: number): Observable<ITask[]> {
    return from(this.db.tasks.toArray()).pipe(
      switchMap(async (elements) => {
        let tasks = elements.filter((task) => task.taskListId === task.taskListId);
        const index: number = tasks.findIndex((element) => element.id === elements[currentIndex].id);
        tasks = await firstValueFrom(this.deleteTask(task));
        await firstValueFrom(this.addNodeAt<ITask>(this.db.tasks, task, tasks, index-1));
        return this.db.tasks.toArray();
      })
    );
  }

  public moveList(list: IList, currentIndex: number): Observable<IList[]> {
    return from(this.db.taskLists.toArray()).pipe(
      switchMap(async (elements) => {
        const index: number = elements.findIndex((element) => element.id === elements[currentIndex].id);
        const lists = await firstValueFrom(this.deleteList(list));
        await firstValueFrom(this.addNodeAt<IList>(this.db.taskLists, list, lists, index-1));
        return this.db.taskLists.toArray();
      })
    );
  }

  private deleteNode<T extends IDBNode>(table: Table<T, number>, node: T, nodes: T[]): Observable<T[]> {
    return of(sortNodes<T>(nodes)).pipe(
      switchMap(async (elements) => {
        if (node.id === undefined) {
          throw new Error('[Delete Node] Node has no id!');
        }

        const nodeIndex: number = elements.findIndex((element) => element.id === node.id);

        const prevNode: T | undefined = elements[nodeIndex - 1];
        const nextNode: T | undefined = elements[nodeIndex + 1];

        if (prevNode !== undefined) {
          await firstValueFrom(this.updateNode<T>(table, {...prevNode, nextId: nextNode?.id}));
        }

        if (nextNode !== undefined) {
          await firstValueFrom(this.updateNode<T>(table, {...nextNode, prevId: prevNode?.id}));
        }

        await table.delete(node.id);
        return table.toArray();
      }),
    );
  }

  private addNodeAt<T extends IDBNode>(table: Table<T, number>, node: T, nodes: T[], at: number): Observable<T[]> {
    return of(sortNodes<T>(nodes)).pipe(
      switchMap(async (elements) => {
        const prevNode: T | undefined = elements[at];
        const nextNode: T | undefined = elements[at + 1];
        const nodeId: number = await table.add({...node, prevId: prevNode?.id, nextId: nextNode?.id});

        if (prevNode !== undefined) {
          await firstValueFrom(this.updateNode<T>(table, {...prevNode, nextId: nodeId}));
        }

        if (nextNode !== undefined) {
          await firstValueFrom(this.updateNode<T>(table, {...nextNode, prevId: nodeId}));
        }

        return table.toArray();
      }),
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
}
