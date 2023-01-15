import {createReducer, on} from "@ngrx/store";

import {
  addTask, addTaskAfter, addTaskAfterFailed,
  addTaskFailed,
  deleteTask,
  deleteTaskFailed,
  loadTasks, moveTask, moveTaskFailed,
  taskAdded, taskAfterAdded,
  taskDeleted, taskMoved,
  tasksLoaded,
  tasksLoadFailed,
  taskUpdated,
  updateTask,
  updateTaskFailed,
} from "../actions/task.actions";
import {ITask} from "../../../data/db/task";

export type taskInitialState = {
  tasks: ITask[],
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
  on(taskAdded, (state, {tasks}) => ({
    ...state,
    tasks,
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
  on(taskDeleted, (state, {tasks}) => ({
    ...state,
    tasks,
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
  on(addTaskAfter, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(taskAfterAdded, (state, {tasks}) => ({
    ...state,
    tasks,
    isLoading: false,
    error: null,
  })),
  on(addTaskAfterFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
