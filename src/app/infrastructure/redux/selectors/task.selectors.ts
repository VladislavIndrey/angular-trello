import {createFeatureSelector, createSelector} from "@ngrx/store";

import {taskInitialState} from "../reducers/task.reducer";
import {ITask} from "../../../data/db/task";
import {sortNodes} from "../../../utils/nodes-utils";

export const selectTasks = createFeatureSelector<taskInitialState>('task');
export const selectTasksList = (listId: number | undefined) => createSelector(
  selectTasks,
  (task) => {
    if (listId === undefined) {
      throw new Error('List id is undefined!');
    }

    const tasks = [...task.tasks].filter((task) => task.taskListId === listId);

    if (tasks.length === 0) {
      return [];
    }

    return sortNodes<ITask>(tasks);
  }
);
