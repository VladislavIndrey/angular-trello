import {Injectable} from "@angular/core";
import {IEdit} from "./edit.interfase";

@Injectable({
  providedIn: 'root',
})
export class EditService {
  private cards: IEdit[] = [];

  public subscribe(card: IEdit): void {
    const isExist = this.cards.includes(card);
    if (isExist) {
      return;
    }

    this.cards.push(card);
  }

  public unsubscribe(card: IEdit): void {
    const cardIndex = this.cards.indexOf(card);
    if (cardIndex === -1) {
      return;
    }

    this.cards.splice(cardIndex, 1);
  }

  public notify(): void {
    this.cards.forEach((card) => card.update());
  }
}
