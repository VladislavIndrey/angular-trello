import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {MatRippleModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {TextFieldModule} from "@angular/cdk/text-field";

import {CustomButtonComponent} from "../custom-button/custom-button.component";
import {PriorityComponent} from "../priority/priority.component";
import {TaskPriorityModel} from "../../models/task-priority.model";
import {PrioritySelectorComponent} from "../priority-selector/priority-selector.component";
import {BlueInputDirective} from "../../shared/blue-input.directive";

import {addTask, updateTask} from "../../redux/actions/task.actions";
import {Task} from "../../data/db/task";

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MatIconModule,
    CustomButtonComponent,
    TextFieldModule,
    PriorityComponent,
    PrioritySelectorComponent,
    BlueInputDirective
  ],
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent {
  @Input() listId: number | undefined = 0;
  @Input() tasks: Task[] = [];
  public isAddMod: boolean = false;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  constructor(private store: Store) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
  }

  public onAddClicked($event: MouseEvent, text: string, ownerName: string): void {
    $event.stopPropagation();
    let nextId: number | undefined = undefined;
    let prevId: number | undefined = undefined;

    if (this.tasks.length) {
        prevId = this.tasks[this.tasks.length-1].id;
        if (prevId !== undefined) {
          this.store.dispatch(updateTask({id: prevId, task: {...this.tasks[this.tasks.length - 1], nextId: prevId + 1}}));
        }
    }

    this.store.dispatch(addTask({
      task: {
        text,
        ownerName,
        taskListId: this.listId!,
        priority: this.taskPriorityModel.priority.id,
        nextId,
        prevId,
      }
    }));
    this.isAddMod = false;
  }

  public onCancelClicked($event: MouseEvent): void {
    $event.stopPropagation();
    this.isAddMod = false;
  }
}
