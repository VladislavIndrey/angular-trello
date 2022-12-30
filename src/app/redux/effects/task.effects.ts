import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";

import {LocalDBService} from "../../services/local-d-b.service";
import {
  addTask, addTaskFailed,
  loadTasks, taskAdded,
  tasksLoaded,
  tasksLoadFailed,
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
      map(() => taskAdded()),
      catchError((error) => of(addTaskFailed({error}))),
    )),
  ));

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
