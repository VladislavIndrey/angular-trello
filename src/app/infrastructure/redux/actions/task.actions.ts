import {createAction, props} from "@ngrx/store";

import {ITask} from "../../../data/db/task";

const LIST_COMPONENT: string = '[List Component]';
const LOCAL_DB: string = '[Local DB API]';
const ADD_CARD_COMPONENT: string = '[Add Card Component]';
const CARD_COMPONENT: string = '[Card Component]';

export const loadTasks = createAction(`${LIST_COMPONENT} Load Tasks`);
export const tasksLoaded = createAction(`${LOCAL_DB} Tasks Loaded Success`, props<{ tasks: ITask[] }>());
export const tasksLoadFailed = createAction(`${LOCAL_DB} Tasks Load Failed`, props<{ error: any }>());

export const addTask = createAction(`${ADD_CARD_COMPONENT} Add Task`, props<{ task: ITask }>());
export const taskAdded = createAction(`${LOCAL_DB} Task Added`, props<{ tasks: ITask[] }>());
export const addTaskFailed = createAction(`${LOCAL_DB}  Add Task Failed`, props<{ error: any }>());

export const deleteTask = createAction(`${CARD_COMPONENT} Delete Task Request`, props<{ task: ITask }>());
export const taskDeleted = createAction(`${LOCAL_DB} Task Deleted`, props<{ tasks: ITask[] }>());
export const deleteTaskFailed = createAction(`${LOCAL_DB} Delete Task Failed`, props<{ error: any }>());

export const updateTask = createAction(`${CARD_COMPONENT} Update Task`, props<{ id: number, task: ITask }>());
export const taskUpdated = createAction(`${LOCAL_DB} Task Updated`, props<{ tasks: ITask[] }>());
export const updateTaskFailed = createAction(`${LOCAL_DB} Update Task Failed`, props<{ error: any }>());

export const moveTask = createAction(`${CARD_COMPONENT} Move Task`, props<{ task: ITask, currentIndex: number }>());
export const taskMoved = createAction(`${LOCAL_DB} Task Moved`, props<{ tasks: ITask[] }>());
export const moveTaskFailed = createAction(`${LOCAL_DB} Move Task Failed`, props<{ error: any }>());

export const transferTask = createAction(`${CARD_COMPONENT} Transfer Task`,
  props<{ task: ITask, currentIndex: number, newListId: number }>());
export const taskTransferred = createAction(`${LOCAL_DB} Task Transferred`, props<{ tasks: ITask[] }>());
export const transferTaskFailed = createAction(`${LOCAL_DB} Transfer Task Failed`, props<{ error: any }>())
