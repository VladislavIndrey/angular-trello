import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDropList} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-list',
  standalone: true,
    imports: [CommonModule, CdkDropList],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

}
