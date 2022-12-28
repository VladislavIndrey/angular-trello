import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from "../../card/card.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
    imports: [CommonModule, CardComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

}
