import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDropListGroup} from "@angular/cdk/drag-drop";
import {ListComponent} from "../list/list.component";
import {AddListComponent} from "../add-list/add-list.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, ListComponent, AddListComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

}
