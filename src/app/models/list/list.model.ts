import {Store} from "@ngrx/store";
import {IList} from "../../data/db/list";
import {deleteList, updateList} from "../../infrastructure/redux/actions/list.actions";
import {moveTask} from "../../infrastructure/redux/actions/task.actions";
import {ITask} from "../../data/db/task";

export class ListModel {
  constructor(private _store: Store) {
  }

  public moveTask(container: ITask[], task: ITask, newIndex: number): void {
    const prevTask: ITask | undefined = container.at(newIndex - 1);
    const nextTask: ITask | undefined = container.at(newIndex + 1);

    let updatedPrevTask: ITask | undefined;
    let updatedNextTask: ITask | undefined;

    if (prevTask !== undefined) {
      updatedPrevTask = {...prevTask, nextId: task.id};
    }

    if (newIndex === 0) {
      updatedPrevTask = undefined;
    }

    if (nextTask !== undefined) {
      updatedNextTask = {...nextTask, prevId: task.id};

      if (nextTask.nextId === task.id) {
        updatedNextTask = {...updatedNextTask, nextId: container.at(newIndex+2)?.id};
      }
    }

    let updatedTask: ITask = {...task, prevId: updatedPrevTask?.id, nextId: updatedNextTask?.id};
    // console.log({prevTask: updatedPrevTask, nextTask: updatedNextTask, taskToMove: updatedTask})
    this._store.dispatch(moveTask({prevTask: updatedPrevTask, nextTask: updatedNextTask, taskToMove: updatedTask}));
  }

  private updateNodeLinks(container: ITask[], task: ITask): ITask | undefined {
    return undefined;
  }

  public deleteList(lists: IList[], listToDelete: IList): void {
    if (listToDelete.id === undefined) {
      throw new Error(`[Delete List] Deleted list's id is undefined!`);
    }

    this._store.dispatch(deleteList({id: listToDelete.id}));

    const prevList: IList | undefined = lists.find((list) => list.id === listToDelete.prevId);
    const nextList: IList | undefined = lists.find((list) => list.id === listToDelete.nextId);

    this.updateListNodesId(prevList, nextList?.id, prevList?.prevId);
    this.updateListNodesId(nextList, nextList?.nextId, prevList?.id);
  }

  public updateList(list: IList): void {
    if (list.id === undefined) {
      throw new Error(`[Update List] Updated list's id is undefined!`);
    }

    this._store.dispatch(updateList({id: list.id, list}));
  }

  private updateListNodesId(list: IList | undefined, nextId: number | undefined, prevId: number | undefined): void {
    if (list !== undefined) {
      if (list.id === undefined) {
        throw new Error(`[Update List Nodes Id] List's id is undefined!`);
      }

      this._store.dispatch(updateList({id: list.id, list: {...list, nextId, prevId}}));
    }
  }
}
