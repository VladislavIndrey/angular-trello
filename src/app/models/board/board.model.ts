import {Store} from "@ngrx/store";
import {moveList} from "../../infrastructure/redux/actions/list.actions";
import {IList} from "../../data/db/list";

export class BoardModel {
  constructor(private _store: Store) {
  }

  public moveList(list: IList, currentIndex: number): void {
    this._store.dispatch(moveList({ list, currentIndex}));
  }
}
