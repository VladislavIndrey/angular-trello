import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Task} from "../../models/task.model";
import {selectLists} from "./list.selectors";

export const selectTasks = createFeatureSelector<Task[]>('tasks');
export const selectTasksList = createSelector(
  selectTasks,
  selectLists,
  (tasks, lists) =>
)
