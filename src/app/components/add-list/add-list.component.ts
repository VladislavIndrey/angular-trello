import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";

import {BlueInputDirective} from "../../shared/blue-input.directive";
import {AddListModel} from "../../models/add-list/add-list.model";
import {IList} from "../../data/db/list";

// TODO: Add keyup event and validation.
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
  @Input() lists: IList[] = [];
  public isAddMod = false;

  private readonly addListModel: AddListModel = new AddListModel(this.store);

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
    $event.preventDefault();
    $event.stopPropagation();
    this.addList(title);
  }

  public onEnterClicked($event: KeyboardEvent, title: string): void {
    if ($event.key === 'Enter') {
      this.addList(title);
    }
  }

  public onCancelClicked(): void {
    this.isAddMod = false;
  }

  public onInputBlur(): void {
    this.isAddMod = false;
  }

  private addList(title: string): void {
    if (!title.trim()) {
      return;
    }

    this.addListModel.addList(this.lists, {title});
    this.isAddMod = false;
  }

}
