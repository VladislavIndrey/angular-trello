import {Store} from "@ngrx/store";

import {ITask} from "../../data/db/task";
import {addTask, addTaskAfter} from "../../infrastructure/redux/actions/task.actions";

export class AddCardModel {

  constructor(private _store: Store) {
  }

  public addTask(tasks: ITask[], newTask: ITask): void {
    const prevTask: ITask | undefined = tasks[tasks.length - 1];

    if (prevTask !== undefined) {
      this._store.dispatch(addTaskAfter({prevTask, newTask}));
      return;
    }

    this._store.dispatch(addTask({task: newTask}));
  }

}
