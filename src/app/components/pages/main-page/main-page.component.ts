import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardComponent} from "../../board/board.component";
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, BoardComponent, HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

}
