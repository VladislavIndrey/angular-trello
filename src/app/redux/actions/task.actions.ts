import {createAction, props} from "@ngrx/store";
import {List} from "../../models/list.model";

export const loadTaskLists = createAction('[Main Page] Load Task Lists');
export const taskListsLoaded = createAction('[Local DB API] Task Lists Loaded Success',
  props<{taskLists: List[]}>());
export const taskListsLoadFailed = createAction('[Local DB API] Task Lists Load Failed', props<{error: any}>());
