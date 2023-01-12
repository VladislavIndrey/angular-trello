import {IDBNode} from "./db-node";

export interface ITask extends IDBNode {
  taskListId: number;
  text: string;
  priority: number;
  ownerName: string;
}
