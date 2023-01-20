import {
  ChangeDetectionStrategy,
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
export class CardComponent implements OnInit {
  @Input() task: ITask | undefined;
  @Input() tasks: ITask[] = [];
  public isEditMode: boolean = false;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  private cardModel: CardModel = new CardModel(this._store);

  constructor(private _store: Store, private dragDropService: DragDropService) {
  }

  ngOnInit(): void {
    if (this.task !== undefined) {
      this.taskPriorityModel.changePriority(this.task.priority);
    }
  }

  public onEditClicked(): void {
    this.isEditMode = true;
  }

  public onCancelClicked(): void {
    this.isEditMode = false;
  }

  public onDeleteTaskClicked(): void {
    if (this.task !== undefined) {
      this.cardModel.deleteTask(this.tasks, this.task);
    }

  }

  public onSaveClicked(text: string, ownerName: string): void {
    if (this.task === undefined) return;
    if (this.task.id === undefined) {
      throw new Error('Task id is undefined!');
    } else {
      this.cardModel.updateTask(this.task.id, {
        taskListId: this.task.taskListId,
        text,
        ownerName,
        priority: this.taskPriorityModel.priority.id,
      });
    }
  }

  public dragMoved(event: CdkDragMove): void {
    this.dragDropService.dragMoved(event);
  }

  public dragReleased(event: CdkDragRelease): void {
    this.dragDropService.dragReleased(event);
  }
}
