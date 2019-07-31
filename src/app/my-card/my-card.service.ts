import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

interface CardData {
  ProductDescription: string;
  ProductName: string;
  Quantity: number;
  TotalPrice: number;
  UnitPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class MyCardService {

  private newItemCard: Card;
  private cardArray: Card[];

  constructor(private http: HttpClient) { }

  GetData() {
    return this.http.get<{ [key: string]: CardData }>('../../assets/card.json')
      .pipe(map(resData => {
        const fetchedCards = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            fetchedCards.push(new Card(resData[key].ProductName, resData[key].ProductDescription, resData[key].UnitPrice, resData[key].Quantity, resData[key].TotalPrice));
          }
        }
        this.cardArray = fetchedCards;
        return this.cardArray;
      }));
  }

  AddNewItem(name: string, description: string, price: number, quantity: number): Observable<Card[]> {
    const totalPrice = this.GetSum(price, quantity);
    this.newItemCard = new Card(name, description, price, quantity, totalPrice);
    this.cardArray.push(this.newItemCard);
    return of(this.cardArray).pipe(tap());
  }

  private GetSum(price: number, quantity: number) {
    const totalPrice = price * quantity;
    return totalPrice;
  }

}
