import {ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {map} from "rxjs";

import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

import {CardComponent} from "../card/card.component";
import {AddCardComponent} from "../add-card/add-card.component";

import {Task} from "../../models/task.model";
import {List} from "../../models/list.model";
import {deleteList, loadLists, updateList} from "../../redux/actions/list.actions";
import {BlueInputDirective} from "../../shared/blue-input.directive";


@Component({
  selector: 'app-list',
  standalone: true,
    imports: [CommonModule, CdkDropList, MatIconModule, CardComponent, AddCardComponent, CdkDrag, MatButtonModule, MatMenuModule, CdkDragHandle, BlueInputDirective],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent { // TODO: Refactoring (create list model)
  // TODO: Recreate drag system
  @Input() list!: List;
  @ViewChild('editInput', {static: false}) editInput!: ElementRef<HTMLInputElement>;
  public isAdding: boolean = false;
  public tasks$ = this.store.select('task')
    .pipe(map((data) =>
      data.tasks.filter((task) => task.taskListId === this.list.id)
    ));

  constructor(private store: Store<{ task: { tasks: Task[] } }>, private changeDetectorRef: ChangeDetectorRef) {
  }

  public onEditClicked(): void {
    this.isAdding = true;
    this.focusInput();
  }

  public onInputBlur(value: string): void {
    this.endEditing(value);
  }

  public onEnterClicked($event: KeyboardEvent, value: string): void {
    if ($event.key === 'Enter') {
      this.endEditing(value);
    }
  }

  public onDeleteClicked(): void {
    this.store.dispatch(deleteList({id: Number(this.list.id)}));
    this.store.dispatch(loadLists());
  }

  private focusInput(): void {
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.editInput.nativeElement.focus();
    })
  }

  private endEditing(value: string) {
    this.updateList(value);
    this.isAdding = false;
  }

  private updateList(title: string): void {
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      if (title.trim() && this.list.title !== title) {
        this.store.dispatch(updateList({id: Number(this.list.id), title: title}));
        this.store.dispatch(loadLists());
      }
    })
  }

}
