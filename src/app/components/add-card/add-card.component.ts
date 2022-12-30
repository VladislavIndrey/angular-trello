import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {MatChipsModule} from "@angular/material/chips";
import {MatMenuModule} from "@angular/material/menu";
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {MatRippleModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {CustomButtonComponent} from "../custom-button/custom-button.component";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatInputModule} from "@angular/material/input";
import {PriorityComponent} from "../priority/priority.component";

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    MatRippleModule,
    MatIconModule,
    CustomButtonComponent,
    TextFieldModule,
    MatInputModule,
    PriorityComponent
  ],
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent {
  @Input() index: number = 0;
  public isAddMod: boolean = false;
  public numbers: number[] = [1,2,3,4,5,6,7,8,];

  constructor(private store: Store) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
  }

  public onAddClicked($event: MouseEvent, text: string): void {
    $event.stopPropagation();
    this.isAddMod = false;
  }
}
