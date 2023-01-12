import {createFeatureSelector, createSelector} from "@ngrx/store";

import {taskInitialState} from "../reducers/task.reducer";
import {ITask} from "../../../data/db/task";

export const selectTasks = createFeatureSelector<taskInitialState>('task');
export const selectTasksList = (listId: number | undefined) => createSelector(
  selectTasks,
  (task) => {
    if (listId === undefined) {
      throw new Error('List id is undefined!');
    }

    const tasks = [...task.tasks];

    if (tasks.length === 0) {
      return [];
    }

    return sortTasks(tasks);
  }
);

function sortTasks(tasks: ITask[]): ITask[] {
  const temp: ITask[] = [];
  const head: ITask | undefined = tasks.find((task) => task.prevId === undefined);
  let node: ITask;

  if (head === undefined) {
    throw new Error('No head was founded!');
  }

  node = head;
  temp.push(node);

  while (node.nextId !== undefined) {
    const nextNode = tasks.find((task) => task.id === node.nextId);

    if (nextNode === undefined) {
      break;
    }

    node = nextNode;
    temp.push(node);
  }

  return temp;
}
