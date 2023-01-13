import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListComponent } from './add-list.component';
import {provideMockStore} from "@ngrx/store/testing";

describe('AddListComponent', () => {
  let component: AddListComponent;
  let fixture: ComponentFixture<AddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddListComponent ],
      providers: [provideMockStore({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
