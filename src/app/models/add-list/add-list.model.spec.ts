import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TestBed} from "@angular/core/testing";

import {IList} from "../../data/db/list";
import {addList} from "../../infrastructure/redux/actions/list.actions";

import {AddListModel} from "./add-list.model";

describe('Add List Model', () => {
  const mockList: IList = {id: 2, title: 'title2'};
  const mockLists: IList[] = [{id: 1, title: 'title1', prevId: undefined, nextId: undefined}];
  let store: MockStore;
  let addListModel: AddListModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: provideMockStore()})

    store = TestBed.inject(MockStore);
    addListModel = new AddListModel(store);
  });

  it('#addList() should call only #addList action if #prevList is undefined', () => {
    const dispatchSpy = spyOn(addListModel['_store'], 'dispatch').and.callThrough();
    addListModel.addList([], mockList);
    expect(dispatchSpy).toHaveBeenCalledWith(addList({list: mockList}));
  });

});
