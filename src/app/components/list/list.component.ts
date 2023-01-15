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
import {Observable, of} from "rxjs";


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

import {IList} from "../../data/db/list";
import {selectTasksList} from "../../infrastructure/redux/selectors/task.selectors";
import {ITask} from "../../data/db/task";
import {selectOrderedLists} from "../../infrastructure/redux/selectors/list.selectors";
import {DragDropService} from "../../infrastructure/services/drag-drop-service/drag-drop.service";
import {ListModel} from "../../models/list/list.model";


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
export class ListComponent implements OnInit, AfterViewInit {
  @Input() list: IList | undefined;
  @Input() lists: IList[] = [];
  @ViewChild('editInput', {static: false}) editInput!: ElementRef<HTMLInputElement>;
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  public isAdding: boolean = false;
  public tasks$: Observable<ITask[]> = of([]);
  public lists$: Observable<IList[]> = of([]);

  private _listModel: ListModel = new ListModel(this._store);

  constructor(
    private _store: Store,
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
      this._listModel.deleteList(this.lists, this.list);
    }
  }

  public drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // TODO: Fix move
      // this._listModel.moveTask(event.container.data, event.container.data[event.currentIndex], event.currentIndex);
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
      this.tasks$ = this._store.select(selectTasksList(this.list?.id));
    }
  }

  private initLists(): void {
    this.lists$ = this._store.select(selectOrderedLists);
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

  private onUpdateList(title: string, list: IList) {
    if (title.trim() && list.title !== title) {
      this._listModel.updateList({...list, title})
    }
  }

}
