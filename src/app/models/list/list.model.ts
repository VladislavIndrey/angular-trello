import {Store} from "@ngrx/store";
import {IList} from "../../data/db/list";
import {deleteList, updateList} from "../../infrastructure/redux/actions/list.actions";

export class ListModel {
  constructor(private _store: Store) {
  }

  public deleteList(lists: IList[], listToDelete: IList): void {
    if (listToDelete.id === undefined) {
      throw new Error(`[Delete List] Deleted list's id is undefined!`);
    }

    this._store.dispatch(deleteList({id: listToDelete.id}));

    const prevList: IList | undefined = lists.find((list) => list.id === listToDelete.prevId);
    const nextList: IList | undefined = lists.find((list) => list.id === listToDelete.nextId);

    this.updateListNodesId(prevList, nextList?.id, prevList?.prevId);
    this.updateListNodesId(nextList, nextList?.nextId, prevList?.id);
  }

  public updateList(list: IList): void {
    if (list.id === undefined) {
      throw new Error(`[Update List] Updated list's id is undefined!`);
    }

    this._store.dispatch(updateList({id: list.id, list}));
  }

  private updateListNodesId(list: IList | undefined, nextId: number | undefined, prevId: number | undefined): void {
    if (list !== undefined) {
      if (list.id === undefined) {
        throw new Error(`[Update List Nodes Id] List's id is undefined!`);
      }

      this._store.dispatch(updateList({id: list.id, list: {...list, nextId, prevId}}));
    }
  }
}
