import {TestBed} from "@angular/core/testing";
import {MockStore, provideMockStore} from "@ngrx/store/testing";

import {IList} from "../../data/db/list";
import {ListModel} from "./list.model";
import {ITask} from "../../data/db/task";
import {moveTask, transferTask} from "../../infrastructure/redux/actions/task.actions";

describe('List Model', () => {
  const mockUndefinedList: IList = {id: undefined, title: ''};
  const mockList: IList = {id: 1, title: ''};
  const mockTask: ITask = {taskListId: 1, id: 1, text: '', ownerName: '', priority: 1};
  const index = 0;
  const listId = 0;
  let store: MockStore;
  let listModel: ListModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: provideMockStore()})

    store = TestBed.inject(MockStore);
    listModel = new ListModel(store);
  });

  it('#moveTask() should call #moveTask action', () => {
    const dispatchSpy = spyOn(listModel['_store'], 'dispatch').and.callThrough();
    listModel.moveTask(mockTask, index);
    expect(dispatchSpy).toHaveBeenCalledWith(moveTask({task: mockTask, currentIndex: index}));
  });

  it('#transferTask() should call #transferTask action', () => {
    const dispatchSpy = spyOn(listModel['_store'], 'dispatch').and.callThrough();
    listModel.transferTask(mockTask, index, listId);
    expect(dispatchSpy)
      .toHaveBeenCalledWith(transferTask({task: mockTask, currentIndex: index, newListId: listId}));
  });

  it('#deleteList() should dispatch store if #listToDelete id is not undefined', () => {
    spyOn(listModel['_store'], 'dispatch');
    listModel.deleteList(mockList);
    expect(listModel['_store'].dispatch).toHaveBeenCalled();
  });

  it('#updateList() should throw error if #list.id is undefined', () => {
    expect(() => listModel.updateList(mockUndefinedList)).toThrowError(`[Update List] Updated list's id is undefined!`);
  });

  it('#updateList() should call store dispatch if #list.id is not undefined', () => {
    spyOn(listModel['_store'], 'dispatch');
    listModel.updateList(mockList);
    expect(listModel['_store'].dispatch).toHaveBeenCalled();
  });
});
