import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskPriorityModel} from "../../models/task-priority.model";
import {PriorityComponent} from "../priority/priority.component";

import {Task} from "../../models/task.model";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {Store} from "@ngrx/store";
import {deleteTask, loadTasks} from "../../redux/actions/task.actions";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    PriorityComponent,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() task!: Task;
  public isEditPriority: boolean = false;
  public isEditText: boolean = false;
  public isEditOwner: boolean = false;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.taskPriorityModel.changePriority(this.task.priority);
  }

  public onEditClicked(): void {
    this.isEditPriority = true;
    this.isEditText = true;
    this.isEditOwner = true;
  }

  public onDeleteTaskClicked(): void {
    if (this.task.id === undefined) {
      throw new Error('Task id is undefined!');
    } else {
      this.store.dispatch(deleteTask({id: this.task.id}));
      this.store.dispatch(loadTasks());
    }
  }
}
