import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";

// TODO: Refactoring create file for task and list
import {LocalDBService} from "../../services/local-d-b.service";
import {
  addList, deleteList, deleteListFailed,
  listAdded,
  listAddFailed, listDeleted, listUpdated, listUpdateFailed,
  loadTaskLists,
  loadTasks,
  taskListsLoaded,
  taskListsLoadFailed,
  tasksLoaded,
  tasksLoadFailed, updateList
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
  ));

  public updateList$ = createEffect(() => this.actions$.pipe(
    ofType(updateList),
    mergeMap((action) => this.localDBService.updateList(action.id, action.title).pipe(
      map(() => listUpdated()),
      catchError((error) => of(listUpdateFailed({error})))
    ))
  ));

  public deleteList$ = createEffect(() => this.actions$.pipe(
    ofType(deleteList),
    mergeMap((action) => this.localDBService.deleteListById(action.id).pipe(
      map(() => listDeleted()),
      catchError((error) => of(deleteListFailed({error})))
    ))
  ));

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
