import {Store} from "@ngrx/store";

import {IList} from "../../data/db/list";
import {addList, updateList} from "../../Infrastructure/redux/actions/list.actions";

export class AddListModel {
  constructor(private store: Store) {
  }

  public addList(lists: IList[], newList: IList): void {

    const prevId: number | undefined = lists[lists.length - 1]?.id;

    if (prevId !== undefined) {
      this.store.dispatch(updateList({id: prevId, list: {...lists[lists.length - 1], nextId: prevId + 1}}));
    }

    this.store.dispatch(addList({list: {...newList, prevId}}));
  }
}
