import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import {ListComponent} from '../list/list.component';
import {AddListComponent} from '../add-list/add-list.component';

import {IList} from "../../data/db/list";
import {BoardModel} from "../../models/board/board.model";
import {selectOrderedLists} from "../../infrastructure/redux/selectors/list.selectors";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    AddListComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  public lists$ = this._store.select(selectOrderedLists);
  private boardModel: BoardModel = new BoardModel(this._store);

  constructor(private _store: Store) {
  }

  public trackList(index: number, list: IList) {
    return list.id;
  }

  drop(event: CdkDragDrop<IList[]>) {
    if (event.previousContainer === event.container) {
      this.boardModel.moveList(event.container.data[event.previousIndex], event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
