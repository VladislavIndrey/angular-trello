import {createFeatureSelector, createSelector} from "@ngrx/store";

import {List} from "../../models/list.model";
import {listInitialState} from "../reducers/list.reducer";

export const selectLists = createFeatureSelector<listInitialState>('list');
export const selectOrderedLists = createSelector(
  selectLists,
  (list) => {
   return [...list.lists].sort((listOne, listTwo) => listOne.orderIndex - listTwo.orderIndex);
  }
);
