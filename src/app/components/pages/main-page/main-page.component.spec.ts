import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPageComponent} from './main-page.component';
import {StoreModule} from "@ngrx/store";
import {provideMockStore} from "@ngrx/store/testing";

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageComponent, StoreModule.forRoot(provideMockStore)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
