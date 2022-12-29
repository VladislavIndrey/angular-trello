import {createAction, props} from "@ngrx/store";

export const createList = createAction('[Board Component] Create List', props<{ title: string }>());
export const removeList = createAction('[Board Component] Remove List');
export const moveList = createAction('[Board Component] Move List');
export const addCard = createAction('[Board Component] Add Card',
  props<{text: string, ownerName: string, id: number, priority: number}>())
