import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";

import {CardComponent} from "../card/card.component";
import {AddCardComponent} from "../add-card/add-card.component";
import {BlueInputDirective} from "../../shared/blue-input.directive";

import {List} from "../../data/db/list";
import {deleteList, updateList} from "../../redux/actions/list.actions";
import {selectTasksList} from "../../redux/selectors/task.selectors";
import {Observable, of} from "rxjs";
import {Task} from "../../data/db/task";
import {selectOrderedLists} from "../../redux/selectors/list.selectors";
import {DragDropService} from "../../Infrastructure/services/drag-drop-service/drag-drop.service";
import {DoublyLinkedList} from "../../data/doubly-linked-List/doubly-linked-List";


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
export class ListComponent implements OnInit, AfterViewInit { // TODO: Refactoring, create ListModel
  @Input() list: List | undefined;
  @ViewChild('editInput', {static: false}) editInput!: ElementRef<HTMLInputElement>;
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  public isAdding: boolean = false;
  public tasks$: Observable<DoublyLinkedList<Task>> = of(new DoublyLinkedList<Task>());
  public lists$: Observable<List[]> = of([]);

  constructor(
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    public dragDropService: DragDropService,
  ) {
  }

  public ngOnInit(): void {
    this.initLists();
    this.initTasks();
  }

  public ngAfterViewInit(): void {
    this.registerDropList();
  }

  public allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.isDropAllowed(drop);
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
    }
  }

  public drop(event: CdkDragDrop<Task[]>) {
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

  private initTasks(): void {
    if (this.list !== undefined) {
      this.tasks$ = this.store.select(selectTasksList(this.list?.id));
    }
  }

  private initLists(): void {
    this.lists$ = this.store.select(selectOrderedLists);
  }

  private registerDropList() {
    if (this.dropList) {
      this.dragDropService.register(this.dropList);
    }
  }

  private isDropAllowed(drop: CdkDropList): boolean {
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
        this.onUpdateList(title, this.list);
      }
    });
  }

  private onUpdateList(title: string, list: List) {
    if (title.trim() && list.title !== title) {
      this.store.dispatch(updateList({
        id: Number(list.id),
        list: {title},
      }));
    }
  }

}
