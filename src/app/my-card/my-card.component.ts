import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyCardService } from './my-card.service';
import { Card } from './card.model';

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.css']
})
export class MyCardComponent implements OnInit {

  form: FormGroup;
  mycardArray: Card[];
  totalCardPrice: number;

  constructor(private cardservice: MyCardService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(100)] }),
      description: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.maxLength(600)] }),
      price: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, , Validators.pattern('^[0-9]*$')] }),
      quantity: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, , Validators.pattern('^[0-9]*$')] })
    });

    this.cardservice.GetData().subscribe(resData => {
      this.mycardArray = resData;
      this.geTotalAmountofCard();
    },
      error => {
        console.log('error when trying fetch user card.', error);
      },
      () => {
        console.log('complete');
      });
  }

  private geTotalAmountofCard() {
    this.totalCardPrice = this.mycardArray.map(x => x.totalPrice).reduce((a, b) => a + b, 0);
    return this.totalCardPrice;
  }

  onSubmit() {
    const name = this.form.value.name;
    const description = this.form.value.description;
    const price = this.form.value.price;
    const quantity = this.form.value.quantity;
    this.cardservice.AddNewItem(name, description, price, quantity).subscribe(resData => {
      this.mycardArray = resData;
      this.geTotalAmountofCard();
      this.form.reset();
    },
      error => {
        console.log('error when trying to add a new item on card.', error);
      },
      () => {
        console.log('complete');
      });
  }
}
