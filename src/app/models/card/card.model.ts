import {Store} from "@ngrx/store";

import {ITask} from "../../data/db/task";
import {deleteTask, updateTask} from "../../infrastructure/redux/actions/task.actions";

export class CardModel {
  constructor(private _store: Store) {
  }

  public deleteTask(tasks: ITask[], taskToDelete: ITask): void {
    this._store.dispatch(deleteTask({task: taskToDelete}));
  }

  public updateTask(id: number, newData: ITask): void {
    this._store.dispatch(updateTask({
      id,
      task: {
        taskListId: newData.taskListId,
        text: newData.text,
        ownerName: newData.ownerName,
        priority: newData.priority,
      }
    }));
  }
}
