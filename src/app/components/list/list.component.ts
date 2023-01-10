import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

import {CardComponent} from "../card/card.component";
import {AddCardComponent} from "../add-card/add-card.component";
import {BlueInputDirective} from "../../shared/blue-input.directive";

import {List} from "../../models/list.model";
import {deleteList, loadLists, updateList} from "../../redux/actions/list.actions";
import {selectTasksList} from "../../redux/selectors/task.selectors";
import {Observable, of} from "rxjs";
import {Task} from "../../models/task.model";


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    MatIconModule,
    CardComponent,
    AddCardComponent,
    CdkDrag,
    MatButtonModule,
    MatMenuModule,
    CdkDragHandle,
    BlueInputDirective,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List | undefined;
  @ViewChild('editInput', {static: false}) editInput!: ElementRef<HTMLInputElement>;
  public isAdding: boolean = false;
  public tasks$: Observable<Task[]> = of([]);

  constructor(private store: Store, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.list !== undefined) {
      this.tasks$ = this.store.select(selectTasksList(this.list?.id));
    }
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
    if (this.list !== undefined) {
      this.store.dispatch(deleteList({id: Number(this.list.id)}));
      this.store.dispatch(loadLists()); // TODO: Load lists on delete
    }
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
      if (this.list !== undefined) {
        if (title.trim() && this.list.title !== title) {
          this.store.dispatch(updateList({
            id: Number(this.list.id),
            list: {title, orderIndex: this.list.orderIndex}
          })); // TODO: Load lists on update
          this.store.dispatch(loadLists());
        }
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      if (event.currentIndex - 1 < 0) {
        event.container.data[event.currentIndex].orderIndex = 0;
      } else {
        event.container.data[event.currentIndex].orderIndex = event.container.data[event.currentIndex - 1].orderIndex + 0.1;
      }
    } else {
      console.log('transfer');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
