import {createFeatureSelector, createSelector} from "@ngrx/store";

import {taskInitialState} from "../reducers/task.reducer";
import {Task} from "../../data/db/task";
import {DoublyLinkedList} from "../../data/doubly-linked-List/doubly-linked-List";
import {DoublyLinkedNode} from "../../data/doubly-linked-List/doubly-linked-node";

export const selectTasks = createFeatureSelector<taskInitialState>('task');
export const selectTasksList = (listId: number | undefined) => createSelector(
  selectTasks,
  (task) => {
    if (listId === undefined) {
      return [];
    }

    const doublyLinkedList = new DoublyLinkedList<Task>();
    const tasks = [...task.tasks];
    const head: Task | undefined = tasks.find((task) => task.prevId === undefined);

    if (head === undefined) {
      throw new Error('Head of tasks was not found!');
    } else {
      let node = head;
      while (node.nextId !== undefined) {
        const nextNode = tasks.find((element) => element.id === node.nextId);

        if (nextNode === undefined) {
          break;
        }

        doublyLinkedList.insertEnd(new DoublyLinkedNode<Task>(nextNode));
        node = nextNode;
      }
    }

    return doublyLinkedList;

    // return [...task.tasks].filter((task) => task.taskListId === listId)
    //   .sort((taskOne, taskTwo) => {
    //     if (taskOne.id !== undefined && taskTwo.id !== undefined) {
    //       return taskOne.id - taskTwo.id;
    //     }
    //
    //     throw new Error('One of task id is undefined!');
    //   })
  },
);

// function orderTasks(tasks: Task[]): Task[] {
//   const firstNode: Task | undefined = tasks.find((element) => element.prevId === undefined);
//
//   if (firstNode === undefined) {
//     throw new Error('First node is undefined!');
//   }
// }
