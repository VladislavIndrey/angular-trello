import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';

import {ListComponent} from '../list/list.component';
import {AddListComponent} from '../add-list/add-list.component';
import {selectOrderedLists} from "../../redux/selectors/list.selectors";
import {Task} from "../../models/task.model";
import {List} from "../../models/list.model";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    ListComponent,
    AddListComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  public lists$ = this.store.select(selectOrderedLists);

  constructor(private store: Store) {
  }

  drop(event: CdkDragDrop<List[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
