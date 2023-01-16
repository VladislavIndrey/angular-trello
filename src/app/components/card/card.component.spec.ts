import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {taskInitialState} from "../../infrastructure/redux/reducers/task.reducer";
import {ITask} from "../../data/db/task";

describe('CardComponent', () => {
  const mockTask: ITask = {id: 1, text: 'mock', ownerName: 'mock', priority: 1, taskListId: 1};
  let store: MockStore;
  const mockInitialState: taskInitialState = {
    tasks: [mockTask],
    error: null,
    isLoading: false
  };
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [provideMockStore({initialState: mockInitialState})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    component.task = mockTask;
    component.tasks = [mockTask];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change priority when task is not undefined', () => {
    component.ngOnInit();
    expect(component.taskPriorityModel.priority.id).toEqual(1);
  });

  it('#onEditClicked() should change #isEditMode correctly', function () {
    expect(component.isEditMode)
      .withContext('false at first')
      .toBeFalse();
    component.onEditClicked();
    expect(component.isEditMode)
      .withContext('true after click')
      .toBeTruthy();
  });

  it('#onCancelClicked() should change #isEditMode correctly', function () {
    component.isEditMode = true;
    expect(component.isEditMode)
      .withContext('true at first')
      .toBeTruthy();
    component.onCancelClicked();
    expect(component.isEditMode)
      .withContext('false after click')
      .toBeFalse();
  });

  it('#onDeleteTaskClicked() should call #cardModel.deleteTask()', () => {
    spyOn(component['cardModel'], 'deleteTask');
    component.onDeleteTaskClicked();
    expect(component['cardModel'].deleteTask).toHaveBeenCalled();
  });

  it('#onSaveClicked() should call #cardModel.updateTask()', () => {
    spyOn(component['cardModel'], 'updateTask');
    component.onSaveClicked('mock', 'mock');
    expect(component['cardModel'].updateTask).toHaveBeenCalled();
  });
});
