import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";


import {LocalDBService} from "../../services/local-d-b.service";
import {taskListsLoaded, taskListsLoadFailed} from "../actions/task.actions";

@Injectable()
export class TaskEffects {

  public loadTaskLists$ = createEffect(() => this.actions$.pipe(
    ofType('[Main Page] Load Task Lists'),
    mergeMap(() => this.localDBService.getTaskLists().pipe(
      map((taskLists) => taskListsLoaded({taskLists})),
      catchError((error) => of(taskListsLoadFailed({error}))),
    ))
  ))

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
