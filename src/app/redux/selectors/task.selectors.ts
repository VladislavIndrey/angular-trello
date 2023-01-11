import {createFeatureSelector, createSelector} from "@ngrx/store";

import {taskInitialState} from "../reducers/task.reducer";
import {Task} from "../../models/task.model";

export const selectTasks = createFeatureSelector<taskInitialState>('task');
export const selectTasksList = (listId: number | undefined) => createSelector(
  selectTasks,
  (task) => {
    if (listId === undefined) {
      return [];
    }

    [...task.tasks].filter((task) => task.taskListId === listId);

    return [...task.tasks].filter((task) => task.taskListId === listId)
      .sort((taskOne, taskTwo) => {
        if (taskOne.id !== undefined && taskTwo.id !== undefined) {
          return taskOne.id - taskTwo.id;
        }

        throw new Error('One of task id is undefined!');
      })
  },
);

function orderTasks(tasks: Task[]): Task[] {
  const firstNode: Task | undefined = tasks.find((element) => element.prevId === undefined);

  if (firstNode === undefined) {
    throw new Error('First node is undefined!');
  }
}
