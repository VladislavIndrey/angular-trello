import {TestBed} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";

import {BoardModel} from "./board.model";
import {IList} from "../../data/db/list";
import {moveList} from "../../infrastructure/redux/actions/list.actions";

describe('Board Model', () => {
  const mockList: IList = {id: 1, title: ''};
  const index = 0;
  let store: MockStore;
  let boardModel: BoardModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: provideMockStore()});

    store = TestBed.inject(MockStore);
    boardModel = new BoardModel(store);
  });

  it('#moveList() should call #moveList action',  () => {
    const dispatchSpy = spyOn(boardModel['_store'], 'dispatch').and.callThrough();
    boardModel.moveList(mockList, index);
    expect(dispatchSpy).toHaveBeenCalledWith(moveList({list: mockList, currentIndex: index}));
  });
});
