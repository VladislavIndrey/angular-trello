import {Card} from "./card.model";

export class List {
  public get cards(): Card[] {
    return this._cards;
  }

  public get name(): string {
    return this._name;
  }

  private _cards: Card[];
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this._cards = [];
  }
}
