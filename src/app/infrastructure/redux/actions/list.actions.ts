import {createAction, props} from "@ngrx/store";

import {IList} from "../../../data/db/list";

const ADD_LIST_COMPONENT = '[Add List Component]';
const BOARD_COMPONENT = '[Board Component]'
const LOCAL_DB_API = '[Local DB API]';
const MAIN_PAGE = '[Main Page]';
const LIST_COMPONENT = '[List Component]';

export const loadLists = createAction(`${MAIN_PAGE} Load Lists`);
export const listsLoaded = createAction(`${LOCAL_DB_API} Lists Loaded Success`, props<{ taskLists: IList[] }>());
export const listsLoadFailed = createAction(`${LOCAL_DB_API} Lists Load Failed`, props<{ error: any }>());

export const addList = createAction(`${ADD_LIST_COMPONENT} Add List`, props<{ list: IList }>());
export const listAdded = createAction(`${LOCAL_DB_API} List Added Success`, props<{ lists: IList[] }>());
export const listAddFailed = createAction(`${LOCAL_DB_API} List Add Failed`, props<{ error: any }>());

export const updateList = createAction(`${LIST_COMPONENT} Edit List`, props<{ id: number, list: IList }>());
export const listUpdated = createAction(`${LOCAL_DB_API} List Updated`, props<{ lists: IList[] }>());
export const listUpdateFailed = createAction(`${LOCAL_DB_API} List Update Failed`, props<{ error: any }>());

export const deleteList = createAction(`${LIST_COMPONENT} Delete List`, props<{ list: IList }>());
export const listDeleted = createAction(`${LOCAL_DB_API} List Deleted`, props<{ lists: IList[] }>());
export const deleteListFailed = createAction(`${LOCAL_DB_API} Delete List Failed`, props<{ error: any }>());

export const moveList = createAction(`${BOARD_COMPONENT} Move List`, props<{ list: IList, currentIndex: number }>());
export const listMoved = createAction(`${LOCAL_DB_API} List Moved`, props<{ lists: IList[] }>());
export const moveListFailed = createAction(`${LOCAL_DB_API} Move List Failed`, props<{ error: any }>());
