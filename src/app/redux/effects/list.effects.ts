import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";

import {
  addList,
  deleteList,
  deleteListFailed,
  listAdded,
  listAddFailed,
  listDeleted,
  listsLoaded,
  listsLoadFailed,
  listUpdated,
  listUpdateFailed,
  loadLists,
  updateList,
} from "../actions/list.actions";
import {LocalDBService} from "../../services/local-d-b.service";

@Injectable()
export class ListEffects {
  public loadTaskLists$ = createEffect(() => this.actions$.pipe(
    ofType(loadLists),
    mergeMap(() => this.localDBService.getTaskLists().pipe(
      map((taskLists) => listsLoaded({taskLists})),
      catchError((error) => of(listsLoadFailed({error}))),
    ))
  ));

  public addList$ = createEffect(() => this.actions$.pipe(
    ofType(addList),
    mergeMap((action) => this.localDBService.addNewList(action.list).pipe(
      map(() => listAdded()),
      catchError((error) => of(listAddFailed({error}))),
    ))
  ));

  public updateList$ = createEffect(() => this.actions$.pipe(
    ofType(updateList),
    mergeMap((action) => this.localDBService.updateList(action.id, action.list).pipe(
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
