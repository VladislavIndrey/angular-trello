import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from "@angular/material/button";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";

import {PriorityComponent} from "../priority/priority.component";
import {TaskPriorityModel} from "../../data/task-priority.model";

@Component({
  selector: 'priority-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    CdkMenuTrigger,
    MatIconModule,
    MatRippleModule,
    CdkMenu,
    PriorityComponent,
    CdkMenuItem,
  ],
  templateUrl: './priority-selector.component.html',
  styleUrls: ['./priority-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrioritySelectorComponent {
  @Input() taskPriorityModel!: TaskPriorityModel;

  public trackById(index: number, item: any) {
    return item.id;
  }
}
