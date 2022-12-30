import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
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
  @ViewChild('nameInput', {static: false}) addListInput!: ElementRef<HTMLInputElement>;
  public isAddMod = false;

  constructor(private store: Store, private changeDetectorRef: ChangeDetectorRef) {
  }

  public onAddListClicked(): void {
    this.isAddMod = true;
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.addListInput.nativeElement.focus();
    });
  }

  public onAddClicked($event: MouseEvent, title: string): void {
    $event.stopPropagation();

    this.store.dispatch(addList({title}));
    this.store.dispatch(loadTaskLists());
    this.isAddMod = false;
  }

  public onCancelClicked(): void {
    this.isAddMod = false;
  }

  public onInputBlur(): void {
  setTimeout(() => {
    this.isAddMod = false;
  }, 150)
  }

}
