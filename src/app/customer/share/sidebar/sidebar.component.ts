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
  cartLength: number=0;
  cartId:number;
  cartGroup:any=null;
  constructor(private  js: JsService,
              private cartService: CartService,) {
    this.cartId= JSON.parse(sessionStorage.getItem("cartId"));
    this.getAllCartByCartGroupId();
  }
  getAllCartByCartGroupId() {
    if (this.cartId!=null) {
      this.cartService.getAllCartByCartGroupId(this.cartId).subscribe((res:CartDetail[]) => {
        if(res) {
         this.cartDetailDto = res;
         this.cartLength=this.cartDetailDto.length;
        }
      });
    }
  }
  getCarGroupById(){
    this.cartService.getCartGroupById(this.cartId).subscribe((res) => {
      this.cartGroup = res;
    })
  }
  ngOnInit() {
    this.js.jsActive()
  }
}
