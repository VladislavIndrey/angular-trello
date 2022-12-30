import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";

import {BoardComponent} from "../../board/board.component";
import {HeaderComponent} from "../../header/header.component";

import {loadLists} from "../../../redux/actions/list.actions";
import {loadTasks} from "../../../redux/actions/task.actions";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, BoardComponent, HeaderComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadLists());
    this.store.dispatch(loadTasks());
  }
}
