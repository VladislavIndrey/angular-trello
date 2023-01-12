export interface Task {
  id?: number;
  taskListId: number;
  text: string;
  priority: number;
  ownerName: string;
  prevId?: number;
  nextId?: number;
}
