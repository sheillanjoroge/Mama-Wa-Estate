import { Component, OnInit, Inject } from '@angular/core';
import { AddToCartService } from '../add-to-cart.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { FlashMessagesService } from 'ngx-flash-messages';
import { ProductsService } from '../products.service';
// import { totalmem } from 'os';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  [x: string]: any;
  body=[]
  products =[]
  prd=[]
  // total:number=0;
  constructor(@Inject(DOCUMENT) private _document: Document, private _productService: ProductsService,private flashMessagesService: FlashMessagesService,private _router: Router,private _cartProductsService:AddToCartService) { }

  ngOnInit(): void {
    this._cartProductsService.getCartProducts()
    .subscribe(
    res=>{
      this.products =res
      console.log(this.products.length)
    },
    err => console.log(err)
    )
  
    this._productService.getAllproducts()
    .subscribe(
      res => this.prd = res,
      err => console.log(err)
    )
  }
  sum(){
    let y:number = 0;
    let x:number;
    for(let i=0; i < this.products.length; i++){
      x = (this.products[i].quantity * this.products[i].subtotal);
      y = y + x;
    }
    return y
  }
  deleteFromCart(id:number){
    this._cartProductsService.deleteCart(id)
    .subscribe(
      res=>{
      console.log('ok')
      this.refreshPage()
      this.flashMessagesService.show('Product successful deleted', {
        classes: ['alert', 'alert-success'], // You can pass as many classes as you need
        timeout: 5000, // Default is 3000
      });
      },
      err=>console.log(err)
    )
    
  }
  refreshPage() {
    this._document.defaultView.location.reload();
  }
  calculate(x:number,y:number){
    let total:Number;
    total = x*y;
    return total
  
  }
  update(id:number,qty:number){

    console.log(qty)
    this._cartProductsService.updateQty(id,qty)
    .subscribe(
      res=>{
      console.log('success')

      },
      err=>console.log(err)
    )
    
  }

}
