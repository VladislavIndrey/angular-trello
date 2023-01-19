import {Store} from "@ngrx/store";

import {IList} from "../../data/db/list";
import {addList} from "../../infrastructure/redux/actions/list.actions";

export class AddListModel {
  constructor(private _store: Store) {
  }

  public addList(lists: IList[], newList: IList): void {
    this._store.dispatch(addList({list: newList}));
  }
}
