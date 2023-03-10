import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {Store} from "@ngrx/store";
import {CommonModule} from '@angular/common';

import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TextFieldModule} from "@angular/cdk/text-field";
import {CdkDrag, CdkDragMove, CdkDragRelease} from "@angular/cdk/drag-drop";

import {TaskPriorityModel} from "../../data/task-priority.model";
import {PriorityComponent} from "../priority/priority.component";
import {PrioritySelectorComponent} from "../priority-selector/priority-selector.component";
import {BlueInputDirective} from "../../shared/blue-input.directive";
import {CustomButtonComponent} from "../custom-button/custom-button.component";

import {ITask} from "../../data/db/task";
import {DragDropService} from "../../infrastructure/services/drag-drop-service/drag-drop.service";
import {CardModel} from "../../models/card/card.model";
import {validateText} from "../../utils/nodes-utils";
import {EditService} from "../../infrastructure/services/edit-card-service/edit.service";
import {IEdit} from "../../infrastructure/services/edit-card-service/edit.interfase";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    PriorityComponent,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    PrioritySelectorComponent,
    BlueInputDirective,
    CustomButtonComponent,
    TextFieldModule,
    CdkDrag,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, IEdit {
  @Input() task: ITask | undefined;
  @Input() tasks: ITask[] = [];
  public isEditMode: boolean = false;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  private cardModel: CardModel = new CardModel(this._store);

  constructor(
    private readonly _store: Store,
    private readonly _dragDropService: DragDropService,
    private readonly _editService: EditService,
    private readonly _detectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.task !== undefined) {
      this.taskPriorityModel.changePriority(this.task.priority);
    }
  }

  public update(): void {
   this.cancelEdit();
   this._detectorRef.detectChanges();
  }

  public onEditClicked(): void {
    this.startEditing();
  }

  public onRightClick($event: MouseEvent): void {
    $event.preventDefault();
    this.startEditing();
  }

  public onCancelClicked(): void {
    this.cancelEdit();
  }

  public onDeleteTaskClicked(): void {
    if (this.task !== undefined) {
      this.cardModel.deleteTask(this.tasks, this.task);
    }

  }

  public onSaveClicked(textValue: string, ownerNameValue: string): void {
    const text = validateText(textValue);
    const ownerName = validateText(ownerNameValue);

    if (this.task === undefined) {
      return;
    }

    if (this.task.id === undefined) {
      throw new Error('Task id is undefined!');
    }

    if (!text.trim() || !ownerName.trim()) {
      return;
    }

    this.cardModel.updateTask(this.task.id, {
      taskListId: this.task.taskListId,
      text,
      ownerName,
      priority: this.taskPriorityModel.priority.id,
    });
    this.cancelEdit();
  }

  public dragMoved(event: CdkDragMove): void {
    this._dragDropService.dragMoved(event);
  }

  public dragReleased(event: CdkDragRelease): void {
    this._dragDropService.dragReleased(event);
  }

  private startEditing(): void {
    this._editService.notify();
    this.isEditMode = true;
    this._editService.subscribe(this);
  }

  private cancelEdit(): void {
    this.isEditMode = false;
    this._editService.unsubscribe(this);
  }
}
