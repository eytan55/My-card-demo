export class Card {
  constructor(
      private _name: string,
      private _description: string,
      private _price: number,
      private _quantity: number,
      private _totalPrice: number
  ) {}

  get name() {
    if (!this._name) {
        return null;
    }
    return this._name;
}

get description() {
    if (!this._description) {
        return null;
    }
    return this._description;
}

get price() {
    if (!this._price) {
        return null;
    }
    return this._price;
}

get quantity() {
    if (!this._quantity) {
        return null;
    }
    return this._quantity;
}

get totalPrice() {
    if (!this._totalPrice) {
        return null;
    }
    return this._totalPrice;
}
}
