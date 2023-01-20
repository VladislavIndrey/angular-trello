import {TestBed} from '@angular/core/testing';
import Dexie, {Table} from "dexie";
import {IDBKeyRange, indexedDB} from "fake-indexeddb";

import {LocalDBService} from './local-d-b.service';
import {ITask} from "../../../data/db/task";
import {IList} from "../../../data/db/list";
import {DbService} from "./db.service";

class DbServiceTest extends Dexie {
  public tasks!: Table<ITask, number>;
  public taskLists!: Table<IList, number>;
  public readonly mockTask: ITask = {
    id: 1,
    taskListId: 0,
    text: 'Feed the birds',
    ownerName: 'Bob',
    priority: 1,
  }
  public readonly mockTaskMove: ITask = {id: 123, text: 'move', taskListId: 1, priority: 0, ownerName: ''};
  public readonly mockTaskHello: ITask = {
    id: 8,
    taskListId: 0,
    text: 'Hello',
    ownerName: 'Bob',
    priority: 1,
  }

  public readonly mockList: IList = {title: 'tit'};
  public readonly mockDeleteList: IList = {id: 8, title: 'delete'};
  public readonly mockUpdateList: IList = {id: 12, title: 'not updated'};
  public transferListId: number = 0;

  constructor() {
    super('trello', {indexedDB: indexedDB, IDBKeyRange: IDBKeyRange});

    this.version(3).stores({
      taskLists: '++id',
      tasks: '++id, taskListId',
    });

    this.on('populate', () => this.populate());
  }

  async populate() {
    const taskListId = await this.taskLists.add({
      title: 'To Do Today',
    });
    await this.taskLists.add(this.mockList);
    await this.taskLists.add(this.mockDeleteList);
    this.transferListId = await this.taskLists.add(this.mockUpdateList);
    await this.tasks.bulkAdd([
      {
        ...this.mockTask,
        taskListId,
      },
      {
        ...this.mockTaskHello,
        taskListId,
      },
      {
        ...this.mockTaskMove,
        taskListId,
      }
    ]);
  }
}

describe('LocalDbService', () => {
  const updateTaskText = 'update';
  const updateListTitle = 'update';
  const mockTask: ITask = {taskListId: 1, text: 'txt', ownerName: 'zoe', priority: 1};
  const mockList: IList = {title: 'Your soul will be mine!'};
  const db = new DbServiceTest();
  let service: LocalDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalDBService,
        {provide: DbService, useValue: db}
      ]
    });
    service = TestBed.inject(LocalDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addTask() should add task and return task array', (done) => {
    service.addTask(mockTask).subscribe((result) => {
      expect(result.length).toBeGreaterThan(1);
      expect(result.some((task) => task.ownerName === mockTask.ownerName)).toBeTruthy();
      done();
    });
  });

  it('getTasks() should return tasks array', (done) => {
    service.getTasks().subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.find((task) => task.ownerName === db.mockTask.ownerName)).toBeTruthy();
      done();
    });
  });

  it('#deleteTask() should delete task and return tasks array', (done) => {
    service.deleteTask(db.mockTaskHello).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.find((task) => task.ownerName === db.mockTaskHello.text)).toBeUndefined();
      done();
    });
  });

  it('#updateTask() should update task and return tasks array', (done) => {
    service.updateTask(1, {...db.mockTask, text: updateTaskText}).subscribe((tasks) => {
      expect(tasks.length).toBeGreaterThan(0);
      expect(tasks.some((task) => task.text === updateTaskText)).toBeTruthy();
      done();
    });
  });

  it('#getTaskLists() should return lists array', (done) => {
    service.getLists().subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((list) => list.title === db.mockList.title)).toBeTruthy();
      done();
    });
  });

  it('#addNewList() should add list and return lists array', (done) => {
    service.addList(mockList).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((list) => list.title === mockList.title)).toBeTruthy();
      done();
    });
  });

  it('#deleteListById() should delete list and return lists array', (done) => {
    service.deleteList(db.mockDeleteList).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((list) => list.title === db.mockDeleteList.title)).toBeFalse();
      done();
    });
  });

  it('#updateList() should update list and return lists array', (done) => {
    service.updateList(db.mockUpdateList.id!, {...db.mockUpdateList, title: updateListTitle})
      .subscribe((result) => {
        expect(result.length).toBeGreaterThan(0);
        expect(result.some((list) => list.title === updateListTitle)).toBeTruthy();
        done();
      });
  });

  it('#moveTask() should update tasks list correctly and return tasks array', (done) => {
    const index = 0;
    service.moveTask(db.mockTaskMove, index).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((task) => task.prevId === db.mockTaskMove.id)).toBeTruthy();
      done();
    })
  });

  it('#transferTask() should update tasks list correctly and return tasks array',  (done) => {
    const index = 0;
    service.transferTask(db.mockTaskHello, index, db.transferListId).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((task) => task.taskListId === db.transferListId)).toBeTruthy();
      done();
    })
  });

  it('#moveList should update lists correctly and return lists array',  (done) => {
    const index = 0;
    service.moveList(db.mockUpdateList, index).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((list) => list.prevId === db.mockUpdateList.id)).toBeTruthy();
      done();
    })
  });
});
