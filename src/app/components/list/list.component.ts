import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDropList} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, MatIconModule, CardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

}
