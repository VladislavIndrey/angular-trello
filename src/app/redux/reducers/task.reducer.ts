import {List} from "../../models/list.model";
import {createReducer, on} from "@ngrx/store";
import {
  addList, listAdded, listAddFailed,
  loadTaskLists,
  loadTasks,
  taskListsLoaded,
  taskListsLoadFailed,
  tasksLoaded,
  tasksLoadFailed
} from "../actions/task.actions";
import {Task} from "../../models/task.model";
import {state} from "@angular/animations";

export const initialState: {
  lists: List[],
  tasks: Task[],
  isLoading: boolean,
  error: any,
} = {
  lists: [],
  tasks: [],
  isLoading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(loadTaskLists, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(taskListsLoaded, (state, {taskLists}) => ({
    ...state,
    lists: taskLists,
    isLoading: false,
    error: null,
  })),
  on(taskListsLoadFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    lists: [],
    error,
  })),
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
  on(addList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(listAdded, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(listAddFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
