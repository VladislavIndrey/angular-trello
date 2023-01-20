import {createAction, createActionGroup, props} from "@ngrx/store";

import {IList} from "../../../data/db/list";

const ADD_LIST_COMPONENT = '[Add List Component]';
const BOARD_COMPONENT = '[Board Component]'
const LOCAL_DB_API = '[Local DB API]';

export const loadLists = createAction('[Main Page] Load Lists');
export const listsLoaded = createAction('[Local DB API] Lists Loaded Success', props<{ taskLists: IList[] }>());
export const listsLoadFailed = createAction('[Local DB API] Lists Load Failed', props<{ error: any }>());

export const addList = createAction(`${ADD_LIST_COMPONENT} Add List`, props<{ list: IList }>());
export const listAdded = createAction('[Local DB API] List Added Success', props<{ lists: IList[] }>());
export const listAddFailed = createAction('[Local DB API] List Add Failed', props<{ error: any }>());

export const updateList = createAction('[List Component] Edit List', props<{ id: number, list: IList }>());
export const listUpdated = createAction('[Local DB API] List Updated', props<{ lists: IList[] }>());
export const listUpdateFailed = createAction('[Local DB API] List Update Failed', props<{ error: any }>());

export const deleteList = createAction('[List Component] Delete List', props<{ list: IList }>());
export const listDeleted = createAction('[Local DB API] List Deleted', props<{ lists: IList[] }>());
export const deleteListFailed = createAction('[Local DB API] Delete List Failed', props<{ error: any }>());

export const moveList = createAction(`${BOARD_COMPONENT} Move List`, props<{ list: IList, currentIndex: number }>());
export const listMoved = createAction(`${LOCAL_DB_API} List Moved`, props<{ lists: IList[] }>());
export const moveListFailed = createAction(`${LOCAL_DB_API} Move List Failed`, props<{ error: any }>());
