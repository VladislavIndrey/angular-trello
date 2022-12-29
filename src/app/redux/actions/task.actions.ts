import {createAction, props} from "@ngrx/store";
import {List} from "../../models/list.model";
import {Task} from "../../models/task.model";

export const loadTaskLists = createAction('[Main Page] Load Task Lists');
export const taskListsLoaded = createAction('[Local DB API] Task Lists Loaded Success',
  props<{ taskLists: List[] }>());
export const taskListsLoadFailed = createAction('[Local DB API] Task Lists Load Failed', props<{ error: any }>());

export const loadTasks = createAction('[List Component] Load Tasks');
export const tasksLoaded = createAction('[Local DB API] Tasks Loaded Success', props<{ tasks: Task[] }>());
export const tasksLoadFailed = createAction('[Local DB API] Tasks Load Failed', props<{ error: any }>());
export const addList = createAction('[Add List Component] Add List', props<{ title: string }>())
export const listAdded = createAction('[Local DB API] List Added Success');
export const listAddFailed = createAction('[Local DB API] List Add Failed', props<{ error: any }>());
export const updateList = createAction('[List Component] Edit List', props<{ id: number, title: string }>())
export const listUpdated = createAction('[Local DB API] List Updated');
export const listUpdateFailed = createAction('[Local DB API] List Update Failed', props<{ error: any }>());
