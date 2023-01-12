import {createAction, props} from "@ngrx/store";

import {Task} from "../../models/task.model";

const LIST_COMPONENT: string = '[List Component]';
const LOCAL_DB: string = '[Local DB API]';
const ADD_CARD_COMPONENT: string = '[Add Card Component]';
const CARD_COMPONENT: string = '[Card Component]';

export const loadTasks = createAction(`${LIST_COMPONENT} Load Tasks`);
export const tasksLoaded = createAction(`${LOCAL_DB} Tasks Loaded Success`, props<{ tasks: Task[] }>());
export const tasksLoadFailed = createAction(`${LOCAL_DB} Tasks Load Failed`, props<{ error: any }>());

export const addTask = createAction(`${ADD_CARD_COMPONENT} Add Task`, props<{ task: Task }>());
export const taskAdded = createAction(`${LOCAL_DB} Task Added`, props<{ tasks: Task[] }>());
export const addTaskFailed = createAction(`${LOCAL_DB}  Add Task Failed`, props<{ error: any }>());

export const deleteTask = createAction(`${CARD_COMPONENT} Delete Task Request`, props<{ id: number }>());
export const taskDeleted = createAction(`${LOCAL_DB} Task Deleted`, props<{ tasks: Task[] }>());
export const deleteTaskFailed = createAction(`${LOCAL_DB} Delete Task Failed`, props<{ error: any }>());

export const updateTask = createAction(`${CARD_COMPONENT} Update Task`, props<{ id: number, task: Task }>());
export const taskUpdated = createAction(`${LOCAL_DB} Task Updated`, props<{ tasks: Task[] }>());
export const updateTaskFailed = createAction(`${LOCAL_DB} Update Task Failed`, props<{ error: any }>());

export const moveTask = createAction(`${CARD_COMPONENT} Move Task`,
  props<{ previousTask: Task, currentTask: Task }>());
export const taskMoved = createAction(`${LOCAL_DB} Task Moved`, props<{ tasks: Task[] }>());
export const moveTaskFailed = createAction(`${LOCAL_DB} Move Task Failed`, props<{ error: any }>());
