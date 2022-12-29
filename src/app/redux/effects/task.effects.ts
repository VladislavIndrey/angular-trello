import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";


import {LocalDBService} from "../../services/local-d-b.service";
import {
  addList,
  listAdded,
  listAddFailed,
  loadTaskLists,
  loadTasks,
  taskListsLoaded,
  taskListsLoadFailed,
  tasksLoaded,
  tasksLoadFailed
} from "../actions/task.actions";

@Injectable()
export class TaskEffects {

  public loadTaskLists$ = createEffect(() => this.actions$.pipe(
    ofType(loadTaskLists),
    mergeMap(() => this.localDBService.getTaskLists().pipe(
      map((taskLists) => taskListsLoaded({taskLists})),
      catchError((error) => of(taskListsLoadFailed({error}))),
    ))
  ));

  public loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks),
    mergeMap(() => this.localDBService.getTasks().pipe(
      map((tasks) => tasksLoaded({tasks})),
      catchError((error) => of(tasksLoadFailed({error}))),
    ))
  ));

  public addList$ = createEffect(() => this.actions$.pipe(
    ofType(addList),
    mergeMap((action) => this.localDBService.addNewList(action.title).pipe(
      map(() => listAdded()),
      catchError((error) => of(listAddFailed({error}))),
    ))
  ))

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
