import {createFeatureSelector, createSelector} from "@ngrx/store";

import {taskInitialState} from "../reducers/task.reducer";
import {Task} from "../../data/db/task";

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

function sortTasks(tasks: Task[]): Task[] {
  const temp: Task[] = [];
  const head: Task | undefined = tasks.find((task) => task.prevId === undefined);
  let node: Task;

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
