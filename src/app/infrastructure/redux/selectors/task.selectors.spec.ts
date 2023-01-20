import {ITask} from "../../../data/db/task";
import {selectTasksList} from "./task.selectors";
import {taskInitialState} from "../reducers/task.reducer";

describe('Task Selector', () => {
  const mockData: taskInitialState = {
    isLoading: false,
    error: null,
    tasks: [
      {
        id: 1,
        text: 'text1',
        taskListId: 1,
        ownerName: 'owner1',
        priority: 1,
        nextId: 2,
        prevId: undefined,
      },
      {
        id: 2,
        text: 'text2',
        taskListId: 1,
        ownerName: 'owner2',
        priority: 2,
        nextId: undefined,
        prevId: 1,
      }
    ]
  };

  const mockDataEmpty: taskInitialState = {
    isLoading: false,
    error: null,
    tasks: []
  };

  it('#selectTasksList should throw error if #listId is undefined', () => {
    expect(() => selectTasksList(undefined).projector(mockData))
      .toThrowError('[Select Tasks List] List id is undefined!');
  });

  it('#selectTasksList should correctly select tasks', () => {
    const result = selectTasksList(1).projector(mockData);
    expect(result.length).toEqual(2);
    expect(result[0].id).toEqual(1);
    expect(result[1].text).toEqual('text2');
  });

  it('#selectTasksList should select empty array if tasks are empty', () => {
    const result = selectTasksList(1).projector(mockDataEmpty);
    expect(result.length).toEqual(0);
  });
});
