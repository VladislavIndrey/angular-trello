import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";

import {
  addList,
  deleteList,
  deleteListFailed,
  listAdded,
  listAddFailed,
  listDeleted, listMoved,
  listsLoaded,
  listsLoadFailed,
  listUpdated,
  listUpdateFailed,
  loadLists, moveList, moveListFailed,
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
      map((lists) => listAdded({lists})),
      catchError((error) => {
        console.log(error)
        return of(listAddFailed({error}));
      }),
    ))
  ));

  public updateList$ = createEffect(() => this.actions$.pipe(
    ofType(updateList),
    mergeMap((action) => this.localDBService.updateList(action.id, action.list).pipe(
      map((lists) => listUpdated({lists})),
      catchError((error) => of(listUpdateFailed({error})))
    ))
  ));

  public deleteList$ = createEffect(() => this.actions$.pipe(
    ofType(deleteList),
    mergeMap((action) => this.localDBService.deleteList(action.list).pipe(
      map((lists) => listDeleted({lists})),
      catchError((error) => of(deleteListFailed({error})))
    ))
  ));

  public moveList$ = createEffect(() => this.actions$.pipe(
    ofType(moveList),
    mergeMap((action) => this.localDBService.moveList(action.list, action.currentIndex).pipe(
      map((lists) => listMoved({lists})),
      catchError((error) => of(moveListFailed({error}))),
    )),
  ));

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
