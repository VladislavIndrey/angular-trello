import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatProgressBarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
}
