import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";

import {
  addList, AddListAfter,
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
import {LocalDBService} from "../../services/local-db/local-d-b.service";

@Injectable()
export class ListEffects {
  public loadTaskLists$ = createEffect(() => this.actions$.pipe(
    ofType(loadLists),
    mergeMap(() => this.localDBService.getLists().pipe(
      map((taskLists) => listsLoaded({taskLists})),
      catchError((error) => of(listsLoadFailed({error}))),
    ))
  ));

  public addList$ = createEffect(() => this.actions$.pipe(
    ofType(addList),
    mergeMap((action) => this.localDBService.addList(action.list).pipe(
      map(([, lists]) => listAdded({lists})),
      catchError((error) => of(listAddFailed({error}))),
    ))
  ));

  public addListAfter$ = createEffect(() => this.actions$.pipe(
    ofType(AddListAfter.add),
    mergeMap((action) => this.localDBService.addListAfter(action.prevList, action.newList).pipe(
      map((lists) => AddListAfter.added({lists})),
      catchError((error) => of(AddListAfter.failed({error}))),
    ))
  ))

  public updateList$ = createEffect(() => this.actions$.pipe(
    ofType(updateList),
    mergeMap((action) => this.localDBService.updateList(action.id, action.list).pipe(
      map(([, lists]) => listUpdated({lists})),
      catchError((error) => of(listUpdateFailed({error})))
    ))
  ));

  public deleteList$ = createEffect(() => this.actions$.pipe(
    ofType(deleteList),
    mergeMap((action) => this.localDBService.deleteList(action.id).pipe(
      map(([, , lists]) => listDeleted({lists})),
      catchError((error) => of(deleteListFailed({error})))
    ))
  ));

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
