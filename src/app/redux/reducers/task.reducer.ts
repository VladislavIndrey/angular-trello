import {List} from "../../models/list.model";
import {createReducer, on} from "@ngrx/store";
import {loadTaskLists, taskListsLoaded, taskListsLoadFailed} from "../actions/task.actions";
import {state} from "@angular/animations";

export const initialState: {
  lists: List[],
  isLoading: boolean,
  error: any,
} = {
  lists: [],
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
    error,
  }))
);
