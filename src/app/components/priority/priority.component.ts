import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";

@Component({
  selector: 'priority',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule],
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent {
  @Input() isSelected: boolean = false;
  @Input('color') bgColor: string = '';
  public readonly defaultColor: string = '#F2F2F2';
}
