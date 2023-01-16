import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddCardComponent} from './add-card.component';
import {provideMockStore} from "@ngrx/store/testing";

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onAddListClicked() should correctly change boolean value #isAddMod', () => {
    expect(component.isAddMod)
      .withContext('false at first')
      .toBeFalse();
    component.onAddListClicked();
    expect(component.isAddMod)
      .withContext('true after click')
      .toBeTruthy();
  });

  it('add-card should correctly change boolean value #isAddMod', () => {
    const element: HTMLElement = fixture.nativeElement;
    const addCardDiv: HTMLDivElement | null = element.querySelector('.add-card');
    expect(component.isAddMod)
      .withContext('false at first')
      .toBeFalse();
    expect(addCardDiv !== null).toBeTruthy();
    if (addCardDiv) {
      addCardDiv.click();
    }
    expect(component.isAddMod)
      .withContext('true after click')
      .toBeTruthy();
  });

  it('#onCancelClicked() should change boolean value #isAddMod', () => {
    const event = new MouseEvent('clear-button__button', {bubbles: true});
    component.isAddMod = true;
    expect(component.isAddMod)
      .withContext('true after click')
      .toBeTruthy();
    component.onCancelClicked(event);
    expect(component.isAddMod)
      .withContext('false at first')
      .toBeFalse();
  });

  it('#onAddClicked() should change boolean value #isAddMod ',  () => {
    const event = new MouseEvent('clear-button__button', {bubbles: true});
    component.isAddMod = true;
    expect(component.isAddMod)
      .withContext('true after click')
      .toBeTruthy();
    component.onAddClicked(event, 'sample string', 'sample string');
    expect(component.isAddMod)
      .withContext('false at first')
      .toBeFalse();
  });
});
