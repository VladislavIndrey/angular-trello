import {Store} from "@ngrx/store";
import {ITask} from "../../data/db/task";
import {addTask, updateTask} from "../../Infrastructure/redux/actions/task.actions";

export class AddCardModel {

  constructor(private store: Store) {
  }

  public addTask(tasks: ITask[], newTask: ITask): void {
    const prevId: number | undefined = tasks[tasks.length - 1]?.id;

    if (prevId !== undefined) {
      this.store.dispatch(updateTask({id: prevId, task: {...tasks[tasks.length - 1], nextId: prevId + 1}}));
    }

    this.store.dispatch(addTask({task: {...newTask, prevId}}));
  }

  }
