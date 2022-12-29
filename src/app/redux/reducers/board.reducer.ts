import {createReducer, on} from '@ngrx/store';
import {addCard, createList, moveList, removeList} from '../actions/board.actions';

export const initialState: List[] = [];

// TODO: Rename reducer and actions file
// TODO: Create reducer
// TODO: Create effects
export const boardReducer = createReducer(
  initialState,
  on(createList, (state, {title}) => [...state, new List(title)]),
  on(removeList, (state) => state),
  on(moveList, (state) => state),
  on(addCard, (state, {text, ownerName, index}) => {
    state[index].addCard(new Card(text, ownerName));
    return state;
  })
);
