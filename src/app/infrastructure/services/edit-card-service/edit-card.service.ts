import {Injectable} from "@angular/core";
import {ICard} from "./card.interfase";

@Injectable({
  providedIn: 'root',
})
export class EditCardService {
  private cards: ICard[] = [];

  public subscribe(card: ICard): void {
    const isExist = this.cards.includes(card);
    if (isExist) {
      return;
    }

    this.cards.push(card);
  }

  public unsubscribe(card: ICard): void {
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
