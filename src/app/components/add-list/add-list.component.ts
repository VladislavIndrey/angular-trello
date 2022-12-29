import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {Store} from "@ngrx/store";
import {addList, loadTaskLists} from "../../redux/actions/task.actions";
import {MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
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

  public onAddClicked($event: MouseEvent, title: string): void {
    $event.stopPropagation();

    this.store.dispatch(addList({title}));
    this.store.dispatch(loadTaskLists());
    this.isAddMod = false;
  }

  public onCancleCliked($event: MouseEvent): void {
    $event.stopPropagation();
    this.isAddMod = false;
  }
}
