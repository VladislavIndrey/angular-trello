import {createAction, props} from "@ngrx/store";

export const createList = createAction('[Board Component] Create List', props<{ name: string }>());
export const removeList = createAction('[Board Component] Remove List');
export const moveList = createAction('[Board Component] Move List');
