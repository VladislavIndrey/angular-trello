import {createAction, props} from "@ngrx/store";

import {Task} from "../../models/task.model";

export const loadTasks = createAction('[List Component] Load Tasks');
export const tasksLoaded = createAction('[Local DB API] Tasks Loaded Success', props<{ tasks: Task[] }>());
export const tasksLoadFailed = createAction('[Local DB API] Tasks Load Failed', props<{ error: any }>());
export const addTask = createAction('[Add Card Component] Add Task', props<{task: Task}>());
export const taskAdded = createAction('[Local DB API] Task Added');
export const addTaskFailed = createAction('[Local DB API] Add Task Failed', props<{error: any}>());
