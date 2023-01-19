import {Store} from "@ngrx/store";
import {IList} from "../../data/db/list";
import {deleteList, updateList} from "../../infrastructure/redux/actions/list.actions";
import {moveTask, transferTask} from "../../infrastructure/redux/actions/task.actions";
import {ITask} from "../../data/db/task";

export class ListModel {
  constructor(private _store: Store) {
  }

  public moveTask(task: ITask, currentIndex: number): void {
    this._store.dispatch(moveTask({task, currentIndex}));
  }

  public transferTask(task: ITask, currentIndex: number, newListId: number): void {
    this._store.dispatch(transferTask({task, currentIndex, newListId}));
  }

  public deleteList(listToDelete: IList): void {
    this._store.dispatch(deleteList({list: listToDelete}));
  }

  public updateList(list: IList): void {
    if (list.id === undefined) {
      throw new Error(`[Update List] Updated list's id is undefined!`);
    }

    this._store.dispatch(updateList({id: list.id, list}));
  }
}
