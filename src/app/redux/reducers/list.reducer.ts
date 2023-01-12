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
import {IList} from "../../data/db/list";

export type listInitialState = {
  lists: IList[],
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
  on(listAdded, (state, {lists}) => ({
    ...state,
    lists,
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
  on(listUpdated, (state, {lists}) => ({
    ...state,
    lists,
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
  on(listDeleted, (state, {lists}) => ({
    ...state,
    lists,
    isLoading: false,
    error: null,
  })),
  on(deleteListFailed, (state, {error}) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
