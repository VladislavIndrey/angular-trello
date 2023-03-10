import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {MatRippleModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {TextFieldModule} from "@angular/cdk/text-field";

import {CustomButtonComponent} from "../custom-button/custom-button.component";
import {PriorityComponent} from "../priority/priority.component";
import {TaskPriorityModel} from "../../data/task-priority.model";
import {PrioritySelectorComponent} from "../priority-selector/priority-selector.component";
import {BlueInputDirective} from "../../shared/blue-input.directive";

import {ITask} from "../../data/db/task";
import {AddCardModel} from "../../models/add-card/add-card.model";
import {validateText} from "../../utils/nodes-utils";

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
  styleUrls: ['./add-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCardComponent {
  @Input() listId: number | undefined = 0;
  @Input() tasks: ITask[] = [];
  public isAddMod: boolean = false;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  private readonly addCardModel = new AddCardModel(this.store);

  constructor(private store: Store) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
  }

  public onAddClicked($event: MouseEvent, textValue: string, ownerNameValue: string): void {
    $event.stopPropagation();

    const text = validateText(textValue);
    const ownerName = validateText(ownerNameValue);

    if (this.listId === undefined) {
      return;
    }

    if (!text.trim() || !ownerName.trim()) {
      return;
    }

    this.addCardModel.addTask(this.tasks, {
      text,
      ownerName,
      taskListId: this.listId,
      priority: this.taskPriorityModel.priority.id,
    });
    this.isAddMod = false;
  }

  public onCancelClicked($event: MouseEvent): void {
    $event.stopPropagation();
    this.isAddMod = false;
  }
}
