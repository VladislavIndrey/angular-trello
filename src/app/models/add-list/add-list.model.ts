import {Store} from "@ngrx/store";

import {IList} from "../../data/db/list";
import {addList, AddListAfter} from "../../infrastructure/redux/actions/list.actions";

export class AddListModel {
  constructor(private _store: Store) {
  }

  public addList(lists: IList[], newList: IList): void {

    const prevList: IList | undefined = lists[lists.length - 1];

    if (prevList !== undefined) {
      this._store.dispatch(AddListAfter.add({prevList, newList}));
      return;
    }

    this._store.dispatch(addList({list: newList}));
  }
}
