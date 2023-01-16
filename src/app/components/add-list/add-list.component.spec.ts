import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AddListComponent } from './add-list.component';
import {provideMockStore} from "@ngrx/store/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

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

  it('#onAddListClicked() should change correctly boolean #isAddMod',  () => {
    expect(component.isAddMod)
      .withContext('false at first')
      .toBeFalse();
    component.onAddListClicked();
    expect(component.isAddMod)
      .withContext('true after click')
      .toBeTruthy();
  });

  it('#onAddClicked() should focus #nameInput',  fakeAsync(() => {
    const de: DebugElement = fixture.debugElement;
    fixture.detectChanges();
    component.onAddListClicked();
    const nameInput = de.query(By.css('.add-list__input')).nativeElement;
    expect(nameInput).toBeTruthy();
    tick();
    const focusedNameInput = de.query(By.css(':focus')).nativeElement;
    expect(nameInput).toEqual(focusedNameInput);
  }));

  it('#onCancelClicked() should change correctly boolean #isAddMod',  () => {
    component.isAddMod = true;
    expect(component.isAddMod)
      .withContext('true at first')
      .toBeTruthy();
    component.onCancelClicked();
    expect(component.isAddMod)
      .withContext('false after click')
      .toBeFalse();
  });

  it('#onEnterClicked() should not call #addList() if key not Enter',  () => {
    const event = new KeyboardEvent('keyup', {key: 'Space'});
    spyOn<AddListComponent, any>(component, 'addList');
    component.onEnterClicked(event, '');
    expect(component['addList']).not.toHaveBeenCalled();
  });

  it('#onEnterClicked() should not call #addList() if key Enter',  () => {
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    spyOn<AddListComponent, any>(component, 'addList');
    component.onEnterClicked(event, '');
    expect(component['addList']).toHaveBeenCalled();
  });

  it('#onInputBlur() should change correctly boolean #isAddMod',  () => {
    component.isAddMod = true;
    expect(component.isAddMod)
      .withContext('true at first')
      .toBeTruthy();
    component.onInputBlur();
    expect(component.isAddMod)
      .withContext('false after click')
      .toBeFalse();
  });

  it('#onAddClicked() should call #addList()',  () => {
    const event = new MouseEvent('buttons__add-button', {bubbles: true});
    spyOn<AddListComponent, any>(component, 'addList');
    component.onAddClicked(event, '');
    expect(component['addList']).toHaveBeenCalled();
  });
});
