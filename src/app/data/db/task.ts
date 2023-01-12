import {IDBNode} from "./db-node";

export interface ITask extends IDBNode {
  id?: number;
  taskListId: number;
  text: string;
  priority: number;
  ownerName: string;
}
