import {createReducer, on} from "@ngrx/store";

import {
  loadTasks,
  tasksLoaded,
  tasksLoadFailed,
} from "../actions/task.actions";
import {Task} from "../../models/task.model";

export const initialState: {
  tasks: Task[],
  isLoading: boolean,
  error: any,
} = {
  tasks: [],
  isLoading: false,
  error: null,
};
export const taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(tasksLoaded, (state, {tasks}) => ({
    ...state,
    isLoading: false,
    tasks,
    error: null,
  })),
  on(tasksLoadFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    tasks: [],
    error,
  })),
);
