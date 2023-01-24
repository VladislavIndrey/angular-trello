import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import {ITask} from "../../data/db/task";
import {ListModel} from "../../models/list/list.model";
import {selectTasksList} from "../../infrastructure/redux/selectors/task.selectors";
import {selectOrderedLists} from "../../infrastructure/redux/selectors/list.selectors";
import {DragDropService} from "../../infrastructure/services/drag-drop-service/drag-drop.service";
import {validateText} from "../../utils/nodes-utils";
import {EditService} from "../../infrastructure/services/edit-card-service/edit.service";
import {IEdit} from "../../infrastructure/services/edit-card-service/edit.interfase";


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
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, AfterViewInit, IEdit {
  @Input() list: IList | undefined;
  @Input() lists: IList[] = [];
  @ViewChild('editInput', {static: false}) editInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  public isAdding: boolean = false;
  public tasks$: Observable<ITask[]> = of([]);
  public lists$: Observable<IList[]> = of([]);

  private _listModel: ListModel = new ListModel(this._store);

  constructor(
    private _store: Store,
    private _changeDetectorRef: ChangeDetectorRef,
    private readonly _editService: EditService,
    public dragDropService: DragDropService,
  ) {
  }

  public ngOnInit(): void {
    this.initLists();
    this.initTasks();
  }

  public update(): void {
    this.cancelEditing();
  }

  public ngAfterViewInit(): void {
    this.registerDropList();
  }

  public allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.isDropAllowed(drop);
  }

  public onEditClicked(): void {
    this.startEditing();
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
      this._listModel.deleteList(this.list);
    }
  }

  public drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      this._listModel.moveTask(event.container.data[event.previousIndex], event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this._listModel.transferTask(
        event.previousContainer.data[event.previousIndex],
        event.currentIndex,
        Number(event.container.element.nativeElement.dataset["id"]));
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public trackTask(index: number, task: ITask) {
    return task.id;
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
    this._changeDetectorRef.detectChanges();
    setTimeout(() => {
      if (this.editInput !== undefined) {
        this.editInput.nativeElement.focus();
      }
    })
  }

  private endEditing(value: string) {
    this.updateList(value);
    this.cancelEditing();
  }

  private updateList(titleValue: string): void {
    this._changeDetectorRef.detectChanges();

    const title = validateText(titleValue);

    if (!title.trim()) {
      return;
    }

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

  private startEditing(): void {
    this._editService.notify();
    this.isAdding = true;
    this._editService.subscribe(this);
  }

  private cancelEditing(): void {
    this.isAdding = false;
    this._changeDetectorRef.detectChanges();
    this._editService.unsubscribe(this);
  }
}
