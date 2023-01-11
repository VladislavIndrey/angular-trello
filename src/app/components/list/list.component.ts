import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem,
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
import {selectOrderedLists} from "../../redux/selectors/list.selectors";
import {DragDropService} from "../../services/drag-drop-service/drag-drop.service";


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
    CdkDropListGroup,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit { // TODO: Refactoring, create ListModel
  @Input() list: List | undefined;
  @ViewChild('editInput', {static: false}) editInput!: ElementRef<HTMLInputElement>;
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  public isAdding: boolean = false;
  public tasks$: Observable<Task[]> = of([]);
  public lists$: Observable<List[]> = of([]);

  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    public dragDropService: DragDropService,
  ) {
  }

  ngOnInit(): void {
    if (this.list !== undefined) {
      this.tasks$ = this.store.select(selectTasksList(this.list?.id));
    }

    this.lists$ = this.store.select(selectOrderedLists);
  }

  ngAfterViewInit(): void {
    if (this.dropList) {
      this.dragDropService.register(this.dropList);
    }
  }

  public allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.isDropAllowed(drag, drop);
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

  private isDropAllowed(drag: CdkDrag, drop: CdkDropList): boolean {
    if (this.dragDropService.currentHoverDropListId === undefined) {
      return true;
    }

    return drop.id === this.dragDropService.currentHoverDropListId;
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
            list: {title},
          })); // TODO: Load lists on update
          this.store.dispatch(loadLists());
        }
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
