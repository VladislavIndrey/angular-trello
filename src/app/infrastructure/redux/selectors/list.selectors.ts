import {createFeatureSelector, createSelector} from "@ngrx/store";

import {listInitialState} from "../reducers/list.reducer";
import {sortNodes} from "../../../utils/nodes-utils";
import {IList} from "../../../data/db/list";

export const selectLists = createFeatureSelector<listInitialState>('list');
export const selectOrderedLists = createSelector(
  selectLists,
  (list) => {

    if (list.lists.length === 0) {
      return [];
    }
    return sortNodes<IList>([...list.lists]);
  }
);
