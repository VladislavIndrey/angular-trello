import {Store} from "@ngrx/store";

import {ITask} from "../../data/db/task";
import {addTask} from "../../infrastructure/redux/actions/task.actions";

export class AddCardModel {

  constructor(private _store: Store) {
  }

  public addTask(tasks: ITask[], newTask: ITask): void {
    this._store.dispatch(addTask({task: newTask}));
  }

}
