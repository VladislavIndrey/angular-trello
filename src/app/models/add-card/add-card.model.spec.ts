import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TestBed} from "@angular/core/testing";

import {AddCardModel} from "./add-card.model";
import {taskInitialState} from "../../infrastructure/redux/reducers/task.reducer";
import {ITask} from "../../data/db/task";
import {addTask, addTaskAfter} from "../../infrastructure/redux/actions/task.actions";

describe('Add Card Model', () => {
  const mockTask: ITask = {taskListId: 1, text: 'txt', ownerName: 'kennen', priority: 1};
  const mockInitialState: taskInitialState = {
    tasks: [],
    error: null,
    isLoading: false,
  };
  const mockTasks: ITask[] = [{...mockTask, text: 'mario'}];

  let store: MockStore;
  let addCardModel: AddCardModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: provideMockStore({initialState: mockInitialState})})

    store = TestBed.inject(MockStore);
    addCardModel = new AddCardModel(store);
  });

  it('#addTask() should call #addTask action if array is empty', () => {
    const dispatchSpy = spyOn(addCardModel['_store'], 'dispatch').and.callThrough();
    addCardModel.addTask([], mockTask);
    expect(dispatchSpy).toHaveBeenCalledWith(addTask({task: mockTask}));
  });

  it('#addTask() should call #addTaskAfter action if array is not empty', () => {
    const dispatchSpy = spyOn(addCardModel['_store'], 'dispatch').and.callThrough();
    addCardModel.addTask(mockTasks, mockTask);
    expect(dispatchSpy).toHaveBeenCalledWith(addTaskAfter({prevTask: mockTasks[0], newTask: mockTask}));
  });
});
