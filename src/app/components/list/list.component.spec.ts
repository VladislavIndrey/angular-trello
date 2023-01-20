import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

import {ListComponent} from './list.component';
import {IList} from "../../data/db/list";
import {ITask} from "../../data/db/task";

describe('ListComponent', () => {
  const mockList: IList = {id: 1, title: 'mock'};
  const lists: IList[] = [mockList];
  const mockTask: ITask = {id: 1, taskListId: 1, priority: 1, text: 'as', ownerName: 'as'};
  const tasks: ITask[] = [mockTask];
  const mockInitialState = {
    lists,
    tasks,
    error: null,
    isLoading: false,
  }

  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [provideMockStore({initialState: mockInitialState})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    component.list = mockList;
    component.lists = lists;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onEditClicked() should change #isAdding correctly', fakeAsync(() => {
    expect(component.isAdding)
      .withContext('false at first')
      .toBeFalse();
    spyOn<ListComponent, any>(component, 'focusInput');
    fixture.detectChanges();
    component.onEditClicked();
    expect(component.isAdding)
      .withContext('true after click')
      .toBeTruthy();
  }));

  it('#onEditClicked() should call #focusInput()', fakeAsync(() => {
    spyOn<ListComponent, any>(component, 'focusInput');
    fixture.detectChanges();
    component.onEditClicked();
    expect(component['focusInput']).toHaveBeenCalled();
  }));

  it('#onInputBlur() should call #endEditing()', () => {
    spyOn<ListComponent, any>(component, 'endEditing');
    component.onInputBlur('mock');
    expect(component['endEditing']).toHaveBeenCalled();
  });

  it('#onEnterClicked() should not call #endEditing() if key is not Enter', () => {
    const event = new KeyboardEvent('keyup', {key: 'Space'});
    spyOn<ListComponent, any>(component, 'endEditing');
    component.onEnterClicked(event, 'mock');
    expect(component["endEditing"]).not.toHaveBeenCalled();
  });

  it('#onEnterClicked() should not call #endEditing() if key is Enter', () => {
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    spyOn<ListComponent, any>(component, 'endEditing');
    component.onEnterClicked(event, 'mock');
    expect(component["endEditing"]).toHaveBeenCalled();
  });

  it('#onDeleteClicked() should not call #_listModel.deleteList() if list is undefined', () => {
    component.list = undefined;
    spyOn(component['_listModel'], 'deleteList');
    component.onDeleteClicked();
    expect(component['_listModel'].deleteList).not.toHaveBeenCalled();
  });

  it('#onDeleteClicked() should call #_listModel.deleteList() if list is not undefined', () => {
    component.list = mockList;
    spyOn(component['_listModel'], 'deleteList');
    component.onDeleteClicked();
    expect(component['_listModel'].deleteList).toHaveBeenCalled();
  });

  it('#ngOnInit() should call #initTasks()', fakeAsync(() => {
    spyOn<ListComponent, any>(component, 'initTasks');
    component.ngOnInit();
    expect(component['initTasks']).toHaveBeenCalled();
  }));

  it('#initTasks() should call #_store.select() if #list is not undefined', fakeAsync(() => {
    component.list = mockList;
    spyOn(component["_store"], 'select');
    component.ngOnInit();
    expect(component['_store'].select).toHaveBeenCalled();
  }));

  it('#registerDropList() should not register drop list if last one is undefined', () => {
    component.dropList = undefined;
    spyOn(component.dragDropService, 'register');
    component.ngAfterViewInit();
    expect(component.dragDropService.register).not.toHaveBeenCalled();
  });

  it('#focusInput() should focus #editInput', fakeAsync(() => {
    const de: DebugElement = fixture.debugElement;
    fixture.detectChanges();
    component.onEditClicked();
    tick();
    const editInput = de.query(By.css('.header__input')).nativeElement;
    expect(editInput).toBeTruthy();
    const focusedEditInput = de.query(By.css(':focus')).nativeElement;
    expect(editInput).toEqual(focusedEditInput);
  }));

  it('#endEditing() should call #updateList()', () => {
    spyOn<ListComponent, any>(component, 'updateList');
    component['endEditing']('mock');
    expect(component['updateList']).toHaveBeenCalled();
  });

  it('#endEditing() should correctly change #isAdding', () => {
    component.isAdding = true;
    expect(component.isAdding)
      .withContext('true at first')
      .toBeTruthy();
    component['endEditing']('mock');
    expect(component.isAdding)
      .withContext('false after call')
      .toBeFalse();
  });

  it('#updateList() should not call #onUpdateList() if #list is undefined', fakeAsync(() => {
    component.list = undefined;
    spyOn<ListComponent, any>(component, 'onUpdateList');
    component['updateList']('mock');
    tick();
    expect(component['onUpdateList']).not.toHaveBeenCalled();
  }));

  it('#updateList() should call #onUpdateList() if #list is not undefined', fakeAsync(() => {
    component.list = mockList;
    spyOn<ListComponent, any>(component, 'onUpdateList');
    component['updateList']('mock');
    tick();
    expect(component['onUpdateList']).toHaveBeenCalled();
  }));

  it('#onUpdateList() should not call #_listModel.updateList() if title is empty', () => {
    spyOn(component['_listModel'], 'updateList');
    component['onUpdateList']('', mockList);
    expect(component['_listModel'].updateList).not.toHaveBeenCalled();
  });

  it('#onUpdateList() should call #_listModel.updateList() if title is not empty', () => {
    component.list = mockList;
    spyOn(component['_listModel'], 'updateList');
    component['onUpdateList']('title', mockList);
    expect(component['_listModel'].updateList).toHaveBeenCalled();
  });
});
