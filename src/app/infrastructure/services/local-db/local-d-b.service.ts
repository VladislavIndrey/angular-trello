import {Injectable} from '@angular/core';
import {delay, delayWhen, first, firstValueFrom, from, map, Observable, of, switchMap, zip} from "rxjs";
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

  public getLists(): Observable<IList[]> {
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

  public deleteTask(task: ITask): Observable<ITask[]> {
    return this.deleteNode<ITask>(this.db.tasks, task);
  }

  public updateTask(id: number, task: ITask): Observable<[number, ITask[]]> {
    return zip(this.db.tasks.update(id, task), this.getTasks());
  }

  public addList(list: IList): Observable<[number, IList[]]> {
    return zip(this.db.taskLists.add(list), this.db.taskLists.toArray());
  }

  public deleteList(id: number): Observable<[void, number, IList[]]> {
    return zip(
      this.db.taskLists.delete(id),
      this.db.tasks.where({taskListId: id}).delete(),
      this.db.taskLists.toArray()
    );
  }

  public updateList(id: number, list: IList): Observable<[number, IList[]]> {
    return zip(this.db.taskLists.update(id, list), this.db.taskLists.toArray());
  }

  // TODO: Fix!!!
  // public moveTask(prevTask: ITask | undefined, nextTask: ITask | undefined, taskToMove: ITask): Observable<ITask[]> {
  //   return this.moveNode<ITask>(this.db.tasks, prevTask, nextTask, taskToMove);
  // }
  //
  // private moveNode<T extends IDBNode>(
  //   table: Table<T, number>,
  //   prevNode: T | undefined,
  //   nextNode: T | undefined,
  //   nodeToMove: T,
  // ): Observable<T[]> {
  //   if (prevNode === undefined && nextNode === undefined) {
  //     throw new Error('[Move Node] Both nodes are undefined!');
  //   }
  //
  //   return zip(
  //     this.updateNode<T>(table, prevNode).pipe(delay(3)),
  //     this.updateNode(table, nextNode),
  //     this.updateNode(table, nodeToMove),
  //     table.toArray(),
  //   ).pipe(
  //     map(([, , , data]) => data),
  //   );
  // }

  private deleteNode<T extends IDBNode>(table: Table<T, number>, node: T) {
    return from(table.toArray()).pipe(
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
