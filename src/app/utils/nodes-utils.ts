import {IDBNode} from "../data/db/db-node";

export function sortNodes<T extends IDBNode>(nodes: T[]) {
  const temp: T[] = [];
  const head: T | undefined = nodes.find((element) => element.prevId === undefined);
  let node: T;

  if (head === undefined) {
    return [];
  }

  node = head;
  temp.push(node);

  while (node.nextId !== undefined) {
    const nextNode = nodes.find((element) => element.id === node.nextId);

    if (nextNode === undefined) {
      break;
    }

    node = nextNode;
    temp.push(node);
  }

  return temp;
}
