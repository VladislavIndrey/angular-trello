import {Store} from "@ngrx/store";
import {Task} from "../../data/db/task";
import {addTask, updateTask} from "../../redux/actions/task.actions";

export class AddCardModel {

  constructor(private store: Store) {
  }

  public addTask(tasks: Task[], newTask: Task): void {
    const prevId: number | undefined = tasks[tasks.length - 1].id;

    if (prevId !== undefined) {
      this.store.dispatch(updateTask({id: prevId, task: {...tasks[tasks.length - 1], nextId: prevId + 1}}));
    }

    this.store.dispatch(addTask({task: {...newTask, prevId}}));
  }
  }