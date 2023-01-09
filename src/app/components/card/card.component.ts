import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {CommonModule} from '@angular/common';

import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TextFieldModule} from "@angular/cdk/text-field";

import {TaskPriorityModel} from "../../models/task-priority.model";
import {PriorityComponent} from "../priority/priority.component";
import {PrioritySelectorComponent} from "../priority-selector/priority-selector.component";
import {BlueInputDirective} from "../../shared/blue-input.directive";
import {CustomButtonComponent} from "../custom-button/custom-button.component";

import {Task} from "../../models/task.model";
import {deleteTask, loadTasks, updateTask} from "../../redux/actions/task.actions";

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
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() task!: Task;
  public isEditMode: boolean = false;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.taskPriorityModel.changePriority(this.task.priority);
  }

  public onEditClicked(): void {
    this.isEditMode = true;
  }

  public onCancelClicked(): void {
    this.isEditMode = false;
  }

  public onDeleteTaskClicked(): void {
    if (this.task.id === undefined) {
      throw new Error('Task id is undefined!');
    } else {
      this.store.dispatch(deleteTask({id: this.task.id}));
      this.store.dispatch(loadTasks());
    }
  }

  public onSaveClicked(text: string, ownerName: string): void {
    if (this.task.id === undefined) {
      throw new Error('Task id is undefined!');
    } else {
      this.store.dispatch(updateTask({
        id: this.task.id,
        task: {taskListId: this.task.taskListId, text, ownerName, priority: this.taskPriorityModel.priority.id}
      }));
    }
  }
}
