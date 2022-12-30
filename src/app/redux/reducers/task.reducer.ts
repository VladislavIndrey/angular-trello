import {List} from "../../models/list.model";
import {createReducer, on} from "@ngrx/store";
import {
  addList, listAdded, listAddFailed, listUpdated, listUpdateFailed,
  loadTaskLists,
  loadTasks,
  taskListsLoaded,
  taskListsLoadFailed,
  tasksLoaded,
  tasksLoadFailed, updateList
} from "../actions/task.actions";
import {Task} from "../../models/task.model";

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
// TODO: Refactoring create file for task and list
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
  })),
  on(updateList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(listUpdated, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(listUpdateFailed, (state, error) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
