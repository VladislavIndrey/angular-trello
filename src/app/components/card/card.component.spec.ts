import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {taskInitialState, taskReducer} from "../../infrastructure/redux/reducers/task.reducer";
import {StoreModule} from "@ngrx/store";

describe('CardComponent', () => {
  let store: MockStore;
  const initialState: taskInitialState = {
    tasks: [{taskListId: 0, text: 'a', ownerName: 'a', priority: 0}],
    error: null,
    isLoading: false
  };
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [provideMockStore({ initialState})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
