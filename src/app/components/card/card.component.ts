import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TaskPriorityModel} from "../../models/task-priority.model";
import {PriorityComponent} from "../priority/priority.component";

import {Task} from "../../models/task.model";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, PriorityComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() task!: Task;
  public taskPriorityModel: TaskPriorityModel = new TaskPriorityModel();

  ngOnInit(): void {
    this.taskPriorityModel.changePriority(this.task.priority);
  }
}
