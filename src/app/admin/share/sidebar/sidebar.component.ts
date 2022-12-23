import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';
import {Dish} from '../../../model/dish';
import {CartService} from '../../../service/cart/cart.service';
import {CartDetail} from '../../../model/cart-detail';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cartDetailDto:CartDetail[];
  cartLength: number;
  cartId:number;
  constructor(private  js: JsService,
              private cartService: CartService,) {
    this.cartId= JSON.parse(sessionStorage.getItem("cartId"));
    this.getAllCart();
  }
  getAllCart() {
    if (this.cartId!=null) {
      this.cartService.getAllDetailByCartId(this.cartId).subscribe((res:CartDetail[]) => {
        this.cartDetailDto = res;
         this.cartLength=this.cartDetailDto.length;
      })
    }
  }
  ngOnInit() {
    this.js.jsActive()
  }
}
