import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TestBed} from "@angular/core/testing";

import {CardModel} from "./card.model";
import {ITask} from "../../data/db/task";

describe('Card Model', () => {
  const mockUndefinedTask: ITask = {id: undefined, taskListId: 1, text: '', priority: 1, ownerName: ''};
  const mockTask: ITask =
    {
      id: 2,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: undefined,
      taskListId: 1,
      nextId: undefined
    };
  const mockTasks: ITask[] = [
    {
      id: undefined,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: undefined,
      taskListId: 1,
      nextId: 2
    },
    {
      id: 2,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: 1,
      taskListId: 1,
      nextId: undefined
    },
  ];
  const mockTasksUndefined: ITask[] = [
    {
      id: 1,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: undefined,
      taskListId: 1,
      nextId: 2
    },
    {
      id: undefined,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: 1,
      taskListId: 1,
      nextId: undefined
    },
  ];
  const mockTasksUndefinedNext: ITask[] = [
    {
      id: 1,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: undefined,
      taskListId: 1,
      nextId: 2
    },
    {
      id: 2,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: 1,
      taskListId: 1,
      nextId: undefined,
    },
    {
      id: undefined,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: 2,
      taskListId: 1,
      nextId: undefined
    },
  ];
  const mockTasksIdeal: ITask[] = [
    {
      id: 1,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: undefined,
      taskListId: 1,
      nextId: 2
    },
    {
      id: 2,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: 1,
      taskListId: 1,
      nextId: 3,
    },
    {
      id: 3,
      ownerName: '',
      priority: 1,
      text: '',
      prevId: 2,
      taskListId: 1,
      nextId: undefined
    },
  ];
  let store: MockStore;
  let cardModel: CardModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({providers: provideMockStore()})

    store = TestBed.inject(MockStore);
    cardModel = new CardModel(store);
  });

  it('#deleteTask() should throw error if #taskToDelete.id is undefined', () => {
    expect(() => cardModel.deleteTask(mockTasks, mockUndefinedTask))
      .toThrowError('[Delete Task] Task To Delete task has no id!');
  });

  it('#deleteTask() should not throw error if #taskToDelete.id is not undefined', () => {
    expect(() => cardModel.deleteTask(mockTasks, mockTask))
      .not.toThrowError('[Delete Task] Task To Delete task has no id!');
  });

  it('#deleteTask() should throw error if #prevTask.id is undefined', () => {
    expect(() => cardModel.deleteTask(mockTasksUndefined, mockTask))
      .toThrowError('[Delete Task] Previous task has no id!');
  });

  it('#deleteTask() should throw error if #nextTask.id is undefined', () => {
    expect(() => cardModel.deleteTask(mockTasksUndefinedNext, mockTasksUndefinedNext[1]))
      .toThrowError('[Delete Task] Next task has no id!');
  });

  it('#deleteTask() should call store dispatch', () => {
    spyOn(cardModel['_store'], 'dispatch');
    cardModel.deleteTask(mockTasksIdeal, mockTasksIdeal[1]);
    expect(cardModel['_store'].dispatch).toHaveBeenCalled();
  });

  it('#updateTask() should call store dispatch', () => {
    spyOn(cardModel['_store'], 'dispatch');
    cardModel.updateTask(1, mockTask);
    expect(cardModel['_store'].dispatch).toHaveBeenCalled();
  });
});
