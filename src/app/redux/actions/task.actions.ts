import {createAction, props} from "@ngrx/store";
import {Task} from "../../models/task.model";

export const loadTasks = createAction('[List Component] Load Tasks');
export const tasksLoaded = createAction('[Local DB API] Tasks Loaded Success', props<{ tasks: Task[] }>());
export const tasksLoadFailed = createAction('[Local DB API] Tasks Load Failed', props<{ error: any }>());

