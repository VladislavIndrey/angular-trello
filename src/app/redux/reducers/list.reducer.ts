import {createReducer, on} from "@ngrx/store";

import {
  addList,
  deleteList,
  deleteListFailed,
  listAdded,
  listAddFailed,
  listDeleted,
  listsLoaded,
  listsLoadFailed,
  listUpdated,
  listUpdateFailed,
  loadLists,
  updateList
} from "../actions/list.actions";
import {List} from "../../models/list.model";

export type listInitialState = {
  lists: List[],
  isLoading: boolean,
  error: any,
};

export const initialState: listInitialState = {
  lists: [],
  isLoading: false,
  error: null,
};

export const listReducer = createReducer(
  initialState,
  on(loadLists, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(listsLoaded, (state, {taskLists}) => ({
    ...state,
    lists: taskLists,
    isLoading: false,
    error: null,
  })),
  on(listsLoadFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    lists: [],
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
  on(listUpdateFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(deleteList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(listDeleted, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(deleteListFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
