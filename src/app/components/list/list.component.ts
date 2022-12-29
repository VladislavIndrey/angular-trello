import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";

import {CardComponent} from "../card/card.component";
import {AddCardComponent} from "../add-card/add-card.component";
import {List} from "../../models/list.model";
import {Store} from "@ngrx/store";
import {Task} from "../../models/task.model";
import {map} from "rxjs";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, MatIconModule, CardComponent, AddCardComponent, CdkDrag],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() list!: List;
  public tasks$ = this.store.select('task')
    .pipe(map((data) =>
      data.tasks.filter((task) => task.listId === this.list.id)
    ));

  constructor(private store: Store<{ task: { tasks: Task[] } }>) {
  }

}
