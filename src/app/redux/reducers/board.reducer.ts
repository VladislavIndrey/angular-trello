import { createReducer, on } from '@ngrx/store';
import { createList, moveList, removeList } from '../actions/board.actions';

export const initialState: unknown[] = []; // TODO: Create models

// TODO: Create reducer
export const boardReducer = createReducer(
  initialState,
  on(createList, (state) => state),
  on(removeList, (state) => state),
  on(moveList, (state) => state)
);
