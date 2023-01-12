import {Store} from "@ngrx/store";

import {ITask} from "../../data/db/task";
import {deleteTask, updateTask} from "../../Infrastructure/redux/actions/task.actions";

export class CardModel {
  constructor(private _store: Store) {
  }

  public deleteTask(tasks: ITask[], taskToDelete: ITask): void {
    if (taskToDelete.id === undefined) {
      throw new Error('[Delete Task] Task To Delete task has no id!');
    }

    const prevTask: ITask | undefined = tasks.find((task) => task.id === taskToDelete.prevId);
    const nextTask: ITask | undefined = tasks.find((task) => task.id === taskToDelete.nextId);

    if (prevTask !== undefined) {
      if (prevTask.id === undefined) {
        throw new Error('[Delete Task] Previous task has no id!');
      }

      this._store.dispatch(updateTask({id: prevTask.id, task: {...prevTask, nextId: nextTask?.id}}));
    }

    if (nextTask !== undefined) {
      if (nextTask.id === undefined) {
        throw new Error('[Delete Task] Next task has no id!');
      }

      this._store.dispatch(updateTask({id: nextTask.id, task: {...nextTask, prevId: prevTask?.id}}));
    }

    this._store.dispatch(deleteTask({id: taskToDelete.id}));
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
