import {TestBed} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";

import {IList} from "../../data/db/list";
import {ListModel} from "./list.model";

describe('List Model', () => {
  const mockUndefinedList: IList = {id: undefined, title: ''};
  const mockList: IList = {id: 1, title: ''};
  let store: MockStore;
  let listModel: ListModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: provideMockStore()})

    store = TestBed.inject(MockStore);
    listModel = new ListModel(store);
  });

  it('#deleteList() should throw error if #listToDelete id is undefined', () => {
    expect(() => listModel.deleteList([], mockUndefinedList))
      .toThrowError(`[Delete List] Deleted list's id is undefined!`);
  });

  it('#deleteList() should dispatch store if #listToDelete id is not undefined', () => {
    spyOn(listModel['_store'], 'dispatch');
    listModel.deleteList([], mockList);
    expect(listModel['_store'].dispatch).toHaveBeenCalled();
  });

  it('#deleteList() should call #updateListNodesId() if #listToDelete id is not undefined', () => {
    spyOn<ListModel, any>(listModel, 'updateListNodesId');
    listModel.deleteList([], mockList);
    expect(listModel['updateListNodesId']).toHaveBeenCalled();
  });

  it('#updateList() should throw error if #list.id is undefined', () => {
    expect(() => listModel.updateList(mockUndefinedList)).toThrowError(`[Update List] Updated list's id is undefined!`);
  });

  it('#updateList() should call store dispatch if #list.id is not undefined', () => {
    spyOn(listModel['_store'], 'dispatch');
    listModel.updateList(mockList);
    expect(listModel['_store'].dispatch).toHaveBeenCalled();
  });

  it('#updateListNodesId() should not throw error if list is not undefined', function () {
    expect(() => listModel['updateListNodesId'](mockList, undefined, undefined))
      .not.toThrowError(`[Update List Nodes Id] List's id is undefined!`);
  });

  it('#updateListNodesId() should throw error if list id is undefined', function () {
    expect(() => listModel['updateListNodesId'](mockUndefinedList, undefined, undefined))
      .toThrowError(`[Update List Nodes Id] List's id is undefined!`);
  });

  it('#updateListNodesId() should call store dispatch if #list.id is not undefined', () => {
    spyOn(listModel['_store'], 'dispatch');
    listModel['updateListNodesId'](mockList, undefined, undefined);
    expect(listModel['_store'].dispatch).toHaveBeenCalled();
  });
});
