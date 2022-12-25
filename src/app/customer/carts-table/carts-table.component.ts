import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {CartService} from '../../service/cart/cart.service';
import {NotificationService} from '../../service/notification/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JsService} from '../../service/js.service';
import {CartDetail} from '../../model/cart-detail';
import {CartDetailDto} from '../../model/cartDetailDto';

import {Dish} from '../../model/dish';
import {DishService} from '../../service/product/dish.service';



@Component({
  selector: 'app-carts-table',
  templateUrl: './carts-table.component.html',
  styleUrls: ['./carts-table.component.css']
})
export class CartsTableComponent implements OnInit {
  cartDetailDto:CartDetailDto[]=[];
  cartDetailList:CartDetail[]=[]
  ProductList: Dish[];
  cartId:number
  quantity:number=1
  billValue: number=0;

  @Input()
  refreshNum = 0;
  currentUser: any;
  loggedIn = false;

  constructor(
    private  js: JsService,
    private authService: AuthService,
              private cartService: CartService,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dishService: DishService,
  ) {
    this.js.jsActive()

  }

  ngOnInit() {
    this.getAllDishes();
    this.cartId= JSON.parse(sessionStorage.getItem("cartId"));
    this.getAllCart();
  }


  getAllCart() {
    if (this.cartId!=null) {
      this.cartService.getAllCartByCartGroupId(this.cartId).subscribe((res:CartDetailDto[]) => {
         this.cartDetailDto=res;
        for (let i = 0; i < this.cartDetailDto.length; i++) {
          for (let j = 0; j < this.ProductList.length; j++) {
             if(this.cartDetailDto[i].dishId==this.ProductList[j].id) {
               const CartDetail={
                 id:this.cartDetailDto[i].id,
                 dish: this.ProductList[j],
                 quantity: this.cartDetailDto[i].quantity,
                 options: this.cartDetailDto[i].options
               }
               this.cartDetailList.push(CartDetail);
               break;
             }
          }
        }
        this.summaryBill()
      })

    }
  }

  getAllDishes() {
    this.dishService.findAll().subscribe(res  => {
      this.ProductList = (<Dish[]> res);
    })
  }

  checkLoginAndGetInfo() {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = this.authService.getCurrentUser();
    }
  }

  increaseDishQuantity(index: number,id:number) {
    this.cartService.increaseQuantity(id).subscribe(
      () => {
        this.cartDetailList[index].quantity=this.cartDetailList[index].quantity+1;
        this.summaryBill();
      })

  }

  decreaseDishQuantity(index: number,id:number) {
    this.cartService.decreaseQuantity(id).subscribe(
      () => {
        this.cartDetailList[index].quantity=this.cartDetailList[index].quantity-1;
        this.summaryBill();
      })
  }

  removeDishOfCart(index: number,id:number) {
    this.cartService.deleteCartById(id).subscribe(
      (res:CartDetail) => {
        this.cartDetailList.splice(index,1)
        this.summaryBill();
      })
  }

  summaryBill(){
    let value=0
    if(this.cartDetailList.length>0) {
    for (let i = 0; i < this.cartDetailList.length; i++) {
       let optionSum=0
      for (let j = 0; j < this.cartDetailList[i].options.length; j++) {
        optionSum+=this.cartDetailList[i].options[j].price;
      }
      let productPrice=this.cartDetailList[i].dish.price + optionSum
      let  quantity= this.cartDetailList[i].quantity;
      value+=productPrice*quantity;
    }
      this.billValue=value;
  }else {
      this.billValue=0;
    }
  }
}
