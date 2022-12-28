import {createReducer, on} from '@ngrx/store';
import {addCard, createList, moveList, removeList} from '../actions/board.actions';

import {List} from "../../models/list.model";
import {Card} from "../../models/card.model";

export const initialState: List[] = [];

// TODO: Rename reducer and actions file
// TODO: Create reducer
export const boardReducer = createReducer(
  initialState,
  on(createList, (state, {name}) => [...state, new List(name)]),
  on(removeList, (state) => state),
  on(moveList, (state) => state),
  on(addCard, (state, {text, ownerName, index}) => {
    state[index].addCard(new Card(text, ownerName));
    return state;
  })
);
