import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";

import {LocalDBService} from "../../services/local-db/local-d-b.service";
import {
  addTask,
  addTaskFailed,
  deleteTask,
  deleteTaskFailed,
  loadTasks, moveTask, moveTaskFailed,
  taskAdded,
  taskDeleted, taskMoved,
  tasksLoaded,
  tasksLoadFailed, taskTransferred, taskUpdated, transferTask, transferTaskFailed, updateTask, updateTaskFailed,
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
      map((tasks) => taskAdded({tasks})),
      catchError((error) => of(addTaskFailed({error}))),
    )),
  ));

  public deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTask),
    mergeMap((action) => this.localDBService.deleteTask(action.task).pipe(
      map((tasks) => taskDeleted({tasks})),
      catchError((error) => of(deleteTaskFailed({error}))),
    )),
  ));

  public updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask),
    mergeMap((action) => this.localDBService.updateTask(action.id, action.task).pipe(
      map((tasks) => taskUpdated({tasks})),
      catchError((error) => of(updateTaskFailed({error}))),
    )),
  ));

  public moveTask$ = createEffect(() => this.actions$.pipe(
    ofType(moveTask),
    mergeMap((action) => this.localDBService.moveTask(action.task, action.currentIndex).pipe(
      map((tasks) => taskMoved({tasks})),
      catchError((error) => of(moveTaskFailed({error}))),
    )),
  ));

  public transferTask$ = createEffect(() => this.actions$.pipe(
    ofType(transferTask),
    mergeMap((action) => this.localDBService.transferTask(action.task, action.currentIndex, action.newListId).pipe(
      map((tasks) => taskTransferred({tasks})),
      catchError((error) => of(transferTaskFailed({error}))),
    )),
  ));

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
