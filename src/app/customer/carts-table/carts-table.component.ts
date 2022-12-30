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
import {environment} from '../../../environments/environment';

declare var Swal: any;
const IMG_URL = `${environment.urlImage}`;
@Component({
  selector: 'app-carts-table',
  templateUrl: './carts-table.component.html',
  styleUrls: ['./carts-table.component.css']
})
export class CartsTableComponent implements OnInit {
  cartDetailDto: CartDetailDto[] = [];
  cartDetailList: CartDetail[] = [];
  ProductList: Dish[];
  cartId: number;
  quantity = 1;
  billValue = 0;
  imgUrl: string = IMG_URL;
  cartLength=0;

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
    if (this.cartId != null) {
      this.cartService.getAllCartByCartGroupId(this.cartId).subscribe((res:CartDetailDto[]) => {
        this.cartLength=res.length;
         this.cartDetailDto=res;
        for (let i = 0; i < this.cartDetailDto.length; i++) {
          for (let j = 0; j < this.ProductList.length; j++) {

             if (this.cartDetailDto[i].dishId == this.ProductList[j].id) {

               const CartDetail = {
                 id: this.cartDetailDto[i].id,
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
    Swal.fire({
      title: 'Bạn có muốn xóa bỏ sản phẩm ra khỏi giỏ hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Có',
      denyButtonText: 'Không',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteCartById(id).subscribe(
          (res:CartDetail) => {
            this.cartDetailList.splice(index,1)
            this.summaryBill();
            if(this.cartLength>0){
              this.cartLength -= 1;
            }
          })
        Swal.fire('Đã Xóa!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Thành công', '', 'info')
      }
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
