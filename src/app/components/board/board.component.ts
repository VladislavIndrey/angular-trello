import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkDropListGroup} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-board',
  standalone: true,
    imports: [CommonModule, CdkDropListGroup],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

}
