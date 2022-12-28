import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {Store} from "@ngrx/store";

import {createList} from "../../redux/actions/board.actions";

@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {
  public isAddMod = false;

  constructor(private store: Store) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
  }

  public onAddClicked($event: MouseEvent, name: string): void {
    this.store.dispatch(createList({name}))
    $event.stopPropagation();
    this.isAddMod = false;
  }
}
