import { createReducer, on } from '@ngrx/store';
import { createList, moveList, removeList } from '../actions/board.actions';

import {List} from "../../models/list.model";

export const initialState: List[] = [];

// TODO: Create reducer
export const boardReducer = createReducer(
  initialState,
  on(createList, (state) => state),
  on(removeList, (state) => state),
  on(moveList, (state) => state)
);
