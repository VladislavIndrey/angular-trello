import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatRippleModule} from "@angular/material/core";

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomButtonComponent {

}
