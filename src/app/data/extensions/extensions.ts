import {DoublyLinkedList} from "../doubly-linked-List/doubly-linked-List";
import {DoublyLinkedNode} from "../doubly-linked-List/doubly-linked-node";

declare global {
  interface Array<T> {
    toDoublyLinkedList(
      headIndex: number,
      condition: (element: T) => boolean,
      find: (element: T) => boolean,
    ): DoublyLinkedList<T>;
  }
}

Array.prototype.toDoublyLinkedList = function <T>(
  headIndex: number,
  condition: (element: T) => boolean,
  find: (element: T) => boolean,
  ) {
  const list = new DoublyLinkedList<T>();
  let node: T = this[headIndex];
  list.insertEnd(new DoublyLinkedNode<T>(node));

  while (condition(node)) {
    list.insertEnd(new DoublyLinkedNode<T>(this.find(find)));
  }

  return list;
}

export {};
