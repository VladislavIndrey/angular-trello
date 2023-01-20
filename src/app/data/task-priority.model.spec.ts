import {TaskPriorityModel} from "./task-priority.model";

describe('TaskPriorityModel', () => {
  const taskPriorityModel = new TaskPriorityModel();

  it('#get priorities() should return correctly value', () => {
    const result = taskPriorityModel.priorities;
    expect(result.length).toEqual(10);
  });

  it('#changePriority() should throw Error if id is incorrect', () => {
    const id = -1;
    expect(() => taskPriorityModel.changePriority(id)).toThrowError(`No priority was found with id: ${id}`);
  });
});
