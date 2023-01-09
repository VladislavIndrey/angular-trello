import {createFeatureSelector, createSelector} from "@ngrx/store";

import {taskInitialState} from "../reducers/task.reducer";

export const selectTasks = createFeatureSelector<taskInitialState>('task');
export const selectTasksList = (listId: number | undefined) => createSelector(
  selectTasks,
  (task) => {
    if (listId === undefined) {
      return [];
    }

    return task.tasks.filter((task) => task.taskListId === listId)
      .sort((taskOne, taskTwo) => taskOne.orderIndex - taskTwo.orderIndex)
  },
);
