import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {mergeMap} from "rxjs";


import {LocalDBService} from "../../services/local-d-b.service";

@Injectable()
export class TaskEffects {

  public loadTaskLists$ = createEffect(() => this.actions$.pipe(
    ofType('[Main Page] Load Task Lists'),
    mergeMap(() => this.localDBService.getTaskLists())
  ))

  constructor(private localDBService: LocalDBService, private actions$: Actions) {
  }
}
