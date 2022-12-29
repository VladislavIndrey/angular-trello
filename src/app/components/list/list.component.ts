import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";

import {CardComponent} from "../card/card.component";
import {AddCardComponent} from "../add-card/add-card.component";
import {List} from "../../models/list.model";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, MatIconModule, CardComponent, AddCardComponent, CdkDrag],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() list!: List;
}
