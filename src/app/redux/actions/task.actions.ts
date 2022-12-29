import {createAction, props} from "@ngrx/store";
import {List} from "../../models/list.model";
import {Task} from "../../models/task.model";

export const loadTaskLists = createAction('[Main Page] Load Task Lists');
export const taskListsLoaded = createAction('[Local DB API] Task Lists Loaded Success',
  props<{ taskLists: List[] }>());
export const taskListsLoadFailed = createAction('[Local DB API] Task Lists Load Failed', props<{ error: any }>());
export const loadTasks = createAction('[List Component] Load Tasks');
export const tasksLoaded = createAction('[Local DB API] Tasks Loaded Success', props<{ tasks: Task[] }>());
export const tasksLoadFailed = createAction('[Local DB API] Tasks Load Failed', props<{ error: any  }>());
