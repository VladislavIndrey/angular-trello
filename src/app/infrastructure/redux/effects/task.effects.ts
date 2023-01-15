import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";

import {LocalDBService} from "../../services/local-db/local-d-b.service";
import {
  addTask, addTaskAfter, addTaskAfterFailed,
  addTaskFailed,
  deleteTask,
  deleteTaskFailed,
  loadTasks, moveTask, moveTaskFailed,
  taskAdded, taskAfterAdded,
  taskDeleted, taskMoved,
  tasksLoaded,
  tasksLoadFailed, taskUpdated, updateTask, updateTaskFailed,
} from "../actions/task.actions";

@Injectable()
export class TaskEffects {
  public loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks),
    mergeMap(() => this.localDBService.getTasks().pipe(
      map((tasks) => tasksLoaded({tasks})),
      catchError((error) => of(tasksLoadFailed({error}))),
    ))
  ));

  public addTask$ = createEffect(() => this.actions$.pipe(
    ofType(addTask),
    mergeMap((action) => this.localDBService.addTask(action.task).pipe(
      map(([, tasks]) => taskAdded({tasks})),
      catchError((error) => of(addTaskFailed({error}))),
    )),
  ));

  public addTaskAfter$ = createEffect(() => this.actions$.pipe(
    ofType(addTaskAfter),
    mergeMap((action) => this.localDBService.addTaskAfter(action.prevTask, action.newTask).pipe(
      map((tasks) => taskAfterAdded({tasks})),
      catchError((error) => of(addTaskAfterFailed({error}))),
    )),
  ));

  public deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTask),
    mergeMap((action) => this.localDBService.deleteTask(action.id).pipe(
      map(([, tasks]) => taskDeleted({tasks})),
      catchError((error) => of(deleteTaskFailed({error}))),
    )),
  ));

  public updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask),
    mergeMap((action) => this.localDBService.updateTask(action.id, action.task).pipe(
      map(([, tasks]) => taskUpdated({tasks})),
      catchError((error) => of(updateTaskFailed({error}))),
    )),
  ));

  public moveTask$ = createEffect(() => this.actions$.pipe(
    ofType(moveTask),
    mergeMap((action) => this.localDBService.moveTask(action.prevTask, action.nextTask, action.taskToMove).pipe(
      map((tasks) => taskMoved({tasks})),
      catchError((error) => of(moveTaskFailed({error}))),
    ))
  ));

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
