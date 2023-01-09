import {createFeatureSelector, createSelector} from "@ngrx/store";

import {List} from "../../models/list.model";

export const selectLists = createFeatureSelector<List[]>('lists');
export const selectOrderedLists = createSelector(
  selectLists,
  (lists) => {
    return lists.sort((listOne, listTwo) => listOne.orderIndex - listTwo.orderIndex);
  }
);
