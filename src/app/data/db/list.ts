import {IDBNode} from "./db-node";

export interface IList extends IDBNode {
  id?: number;
  title: string;
}
