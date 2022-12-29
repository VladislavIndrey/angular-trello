import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {Task} from "../../models/task.model";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDropListGroup, CdkDrag],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() task!: Task;
}
