import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { ListComponent } from '../list/list.component';
import { AddListComponent } from '../add-list/add-list.component';
import { List } from '../../models/list.model';

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
  public lists$ = this.store.select('lists');

  constructor(private store: Store<{ lists: List[] }>) {}
}
