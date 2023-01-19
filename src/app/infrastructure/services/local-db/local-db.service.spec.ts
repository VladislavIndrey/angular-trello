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
  public readonly mockAddTaskAfter: ITask = {text: 'after', ownerName: 'EFT', priority: 2, taskListId: 1};
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
  public readonly mockAddListAfter: IList = {title: 'after effects'};

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
    await this.taskLists.add(this.mockUpdateList);
    await this.tasks.bulkAdd([
      {
        ...this.mockTask,
        taskListId,
      },
      {
        ...this.mockTaskHello,
        taskListId,
      },
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
    service.addTask(mockTask).subscribe(([, result]) => {
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
    service.deleteTask(db.mockTaskHello.id!).subscribe(([, result]) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.find((task) => task.ownerName === db.mockTaskHello.text)).toBeUndefined();
      done();
    });
  });

  it('#updateTask() should update task and return tasks array', (done) => {
    service.updateTask(1, {...db.mockTask, text: updateTaskText}).subscribe(([, tasks]) => {
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
    service.addList(mockList).subscribe(([, result]) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((list) => list.title === mockList.title)).toBeTruthy();
      done();
    });
  });

  it('#deleteListById() should delete list and return lists array', (done) => {
    service.deleteList(db.mockDeleteList.id!).subscribe(([, , result]) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((list) => list.title === db.mockDeleteList.title)).toBeFalse();
      done();
    });
  });

  it('#updateList() should update list and return lists array', (done) => {
    service.updateList(db.mockUpdateList.id!, {...db.mockUpdateList, title: updateListTitle})
      .subscribe(([, result]) => {
        expect(result.length).toBeGreaterThan(0);
        expect(result.some((list) => list.title === updateListTitle)).toBeTruthy();
        done();
      });
  });

  it('#addTaskAfter() should add task after #prevTask and return tasks array',  (done) => {
    service.addTaskAfter(db.mockTask, db.mockAddTaskAfter).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((task) => task.nextId !== undefined)).toBeTruthy();
      expect(result.some((task) => task.text === db.mockAddTaskAfter.text)).toBeTruthy();
      done();
    });
  });

  it('#addListAfter() should add list after #prev and return lists array',  (done) => {
    service.addListAfter(db.mockList, db.mockAddListAfter).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((list) => list.nextId !== undefined)).toBeTruthy();
      expect(result.some((list) => list.title === db.mockAddListAfter.title)).toBeTruthy();
      done();
    });
  });
});
