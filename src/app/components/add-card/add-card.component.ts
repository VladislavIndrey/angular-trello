import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent {
  @Input() index: number = 0;
  public isAddMod: boolean = false;

  constructor(private store: Store) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
  }

  public onAddClicked($event: MouseEvent, text: string): void {
    // TODO: Use object of lists instead of array, use ids for keys
    $event.stopPropagation();
    this.isAddMod = false;
  }
}
