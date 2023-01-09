export interface Task {
  id?: number;
  taskListId: number;
  text: string;
  priority: number;
  ownerName: string;
  orderIndex: number;
}
