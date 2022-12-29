export interface Task {
  id?: number;
  listId: number;
  text: string;
  priority: number;
  ownerName: string;
  // priority: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
