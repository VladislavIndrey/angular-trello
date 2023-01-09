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

import {addTask, loadTasks} from "../../redux/actions/task.actions";

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
  public isAddMod: boolean = false;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  constructor(private store: Store) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
  }

  public onAddClicked($event: MouseEvent, text: string, ownerName: string): void {
    $event.stopPropagation();
    this.store.dispatch(addTask({
      task: {
        text,
        ownerName,
        taskListId: this.listId!,
        priority: this.taskPriorityModel.priority.id
      }
    }));
    this.store.dispatch(loadTasks());
    this.isAddMod = false;
  }

  public onCancelClicked($event: MouseEvent): void {
    $event.stopPropagation();
    this.isAddMod = false;
  }
}
