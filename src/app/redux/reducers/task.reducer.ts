import {createReducer, on} from "@ngrx/store";

import {
  addTask,
  addTaskFailed,
  deleteTask,
  deleteTaskFailed,
  loadTasks, moveTask, moveTaskFailed,
  taskAdded,
  taskDeleted, taskMoved,
  tasksLoaded,
  tasksLoadFailed,
  taskUpdated,
  updateTask,
  updateTaskFailed,
} from "../actions/task.actions";
import {Task} from "../../models/task.model";

export type taskInitialState = {
  tasks: Task[],
  isLoading: boolean,
  error: any,
};

export const initialState: taskInitialState = {
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
  on(addTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(taskAdded, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(addTaskFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(deleteTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(taskDeleted, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(deleteTaskFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(updateTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(taskUpdated, (state, {tasks}) => ({
    ...state,
    tasks,
    isLoading: false,
    error: null,
  })),
  on(updateTaskFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(moveTask, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(taskMoved, (state, {tasks}) => ({
    ...state,
    tasks,
    isLoading: false,
    error: null,
  })),
  on(moveTaskFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
