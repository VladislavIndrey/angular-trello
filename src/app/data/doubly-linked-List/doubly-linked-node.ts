export class DoublyLinkedNode<T> {
  prev: DoublyLinkedNode<T> | undefined;
  next: DoublyLinkedNode<T> | undefined;
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}
