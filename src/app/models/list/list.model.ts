import {Store} from "@ngrx/store";
import {IList} from "../../data/db/list";
import {deleteList, updateList} from "../../infrastructure/redux/actions/list.actions";
import {moveTask} from "../../infrastructure/redux/actions/task.actions";
import {ITask} from "../../data/db/task";

export class ListModel {
  constructor(private _store: Store) {
  }

  // public moveTask(container: ITask[], task: ITask, newIndex: number): void {
  //   const prevTask: ITask | undefined = container.at(newIndex - 1);
  //   const nextTask: ITask | undefined = container.at(newIndex + 1);
  //
  //   let updatedPrevTask: ITask | undefined;
  //   let updatedNextTask: ITask | undefined;
  //
  //   if (prevTask !== undefined) {
  //     updatedPrevTask = {...prevTask, nextId: task.id};
  //   }
  //
  //   if (newIndex === 0) {
  //     updatedPrevTask = undefined;
  //   }
  //
  //   if (nextTask !== undefined) {
  //     updatedNextTask = {...nextTask, prevId: task.id};
  //
  //     if (nextTask.nextId === task.id) {
  //       updatedNextTask = {...updatedNextTask, nextId: container.at(newIndex+2)?.id};
  //     }
  //   }
  //
  //   let updatedTask: ITask = {...task, prevId: updatedPrevTask?.id, nextId: updatedNextTask?.id};
  //   // console.log({prevTask: updatedPrevTask, nextTask: updatedNextTask, taskToMove: updatedTask})
  //   this._store.dispatch(moveTask({prevTask: updatedPrevTask, nextTask: updatedNextTask, taskToMove: updatedTask}));
  // }

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
