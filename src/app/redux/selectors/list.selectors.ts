import {createFeatureSelector, createSelector} from "@ngrx/store";

import {listInitialState} from "../reducers/list.reducer";

export const selectLists = createFeatureSelector<listInitialState>('list');
export const selectOrderedLists = createSelector(
  selectLists,
  (list) => {
    return [...list.lists].sort((listOne, listTwo) => {
      if (listOne.id !== undefined && listTwo.id !== undefined) {
        return listOne.id - listTwo.id;
      }

      throw new Error('One of lists id is undefined');
    });
  }
);
