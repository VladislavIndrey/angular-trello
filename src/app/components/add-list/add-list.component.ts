import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";

import {BlueInputDirective} from "../../shared/blue-input.directive";
import {addList} from "../../redux/actions/list.actions";

// TODO: Add blur event and validation.
@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    BlueInputDirective,
  ],
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {
  @ViewChild('nameInput', {static: false}) addListInput!: ElementRef<HTMLInputElement>;
  public isAddMod = false;

  constructor(private store: Store, private changeDetectorRef: ChangeDetectorRef) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.addListInput.nativeElement.focus();
    });
  }

  public onAddClicked($event: MouseEvent, title: string): void {
    $event.stopPropagation();

    this.store.dispatch(addList({list: {title}}));
    this.isAddMod = false;
  }

  public onCancelClicked(): void {
    this.isAddMod = false;
  }

  public onInputBlur(): void {
    setTimeout(() => {
      this.isAddMod = false;
    }, 150)
  }

}
