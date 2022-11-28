import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {CartService} from '../../service/cart/cart.service';
import {Cart} from '../../model/cart';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';
import {CartDetail} from '../model/cart-detail';
import {Dish} from '../model/dish';
import {JsService} from '../../service/js.service';

@Component({
  selector: 'app-carts-table',
  templateUrl: './carts-table.component.html',
  styleUrls: ['./carts-table.component.css']
})
export class CartsTableComponent implements OnInit, OnChanges {

  carts: Cart[] = [];
  cartDetailList: {
    dish:Dish,
    quantity:number
  }[]
  dish:Dish[];
  @Input()
  refreshNum = 0;

  currentUser: any;
  loggedIn = false;

  constructor(
    private  js: JsService,
    private authService: AuthService,
              private cartService: CartService,
              private notificationService: NotificationService,
              private router: Router
  ) {

    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
  }

  ngOnInit() {
    this.js.jsActive()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCurrentUserCarts();
  }

  checkLoginAndGetInfo() {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = this.authService.getCurrentUser();
    }
  }

  getCurrentUserCarts() {
    if (!this.loggedIn) return;
    this.cartService.getCurrentUserCarts().subscribe(
      (response) => {
        this.carts = response as Cart[];
      }
    );
  }



  increaseDishQuantity(index: number) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
      this.cartDetailList[index].quantity=this.cartDetailList[index].quantity + 1;
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
  }

  decreaseDishQuantity(index: number) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
    this.cartDetailList[index].quantity=this.cartDetailList[index].quantity - 1;
    if(this.cartDetailList[index].quantity==0) {
      this.removeDishOfCart(index)
    }
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
  }
  removeDishOfCart(index: number) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
    this.cartDetailList.splice(index,1)
  }

  checkOut(merchantId: number) {
    this.router.navigateByUrl(`/home/checkout/${merchantId}`);
  }
}
