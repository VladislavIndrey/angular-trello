import {Inject, Injectable} from '@angular/core';
import {CdkDragMove, CdkDragRelease, CdkDropList} from "@angular/cdk/drag-drop";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  get currentHoverDropListId(): string | undefined {
    return this._currentHoverDropListId;
  }

  public get dropLists(): CdkDropList[] {
    return this._dropLists;
  }

  private readonly DROP_LIST_CLASS: string = 'cdk-drop-list';

  private _dropLists: CdkDropList[] = [];
  private _currentHoverDropListId?: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public register(dropList: CdkDropList): void {
    this._dropLists.push(dropList);
  }

  public dragMoved(event: CdkDragMove) {
    const elementFromPoint: Element | null = this.document.elementFromPoint(event.pointerPosition.x, event.pointerPosition.y);

    if (!elementFromPoint) {
      this._currentHoverDropListId = undefined;
      return;
    }

    const dropList: Element | null = elementFromPoint.classList.contains(this.DROP_LIST_CLASS) ? elementFromPoint :
      elementFromPoint.closest(`.${this.DROP_LIST_CLASS}`);

    if (!dropList) {
      this._currentHoverDropListId = undefined;
      return;
    }

    this._currentHoverDropListId = dropList.id;
  }

  public dragReleased(event: CdkDragRelease) {
    this._currentHoverDropListId = undefined;
  }
}
