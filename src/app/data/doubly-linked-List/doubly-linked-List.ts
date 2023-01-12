import {DoublyLinkedNode} from "./doubly-linked-node";

export class DoublyLinkedList<T> {
  private _head: DoublyLinkedNode<T> | undefined;
  private _tail: DoublyLinkedNode<T> | undefined;

  public insertFront(newNode: DoublyLinkedNode<T>): void {
    newNode.next = this._head;
    newNode.prev = undefined;

    if (this._head !== undefined) {
      this._head.prev = newNode;
    }

    this._head = newNode;
  }

  public insertAfter(prevNode: DoublyLinkedNode<T>, newNode: DoublyLinkedNode<T>): void {
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    newNode.prev = prevNode;

    if (newNode.next !== undefined) {
      newNode.next.prev = newNode;
    }
  }

  public insertEnd(newNode: DoublyLinkedNode<T>): void {
    if (this._head === undefined) {
      this.insertFront(newNode);
    }

    newNode.next = undefined;
    newNode.prev = this._tail;

    if (this._tail !== undefined) {
      this._tail.next = newNode;
    }

    this._tail = newNode;
  }

  public toString(): string {
    if (this._head === undefined) {
      return '';
    }

    let node = this._head;
    let str: string = String(node.value);

    while (node.next !== undefined) {
      node = node.next;
      str += ` <==> ${node.value}`;
    }

    return str;
  }
}
