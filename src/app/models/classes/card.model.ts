export class Card {
  public get text(): string {
    return this._text;
  }

  public get priority(): number {
    return this._priority;
  }

  public get ownerName(): string {
    return this._ownerName;
  }

  private _text: string;
  private _priority: number; // TODO: Use enums or type alias
  private _ownerName: string;

  constructor(text: string, ownerName: string) {
    this._text = text;
    this._priority = 0;
    this._ownerName = ownerName;
  }

}
