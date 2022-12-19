import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {CartService} from '../../service/cart/cart.service';
import {Cart} from '../../model/cart';
import {NotificationService} from '../../service/notification/notification.service';
import {Router} from '@angular/router';
import {JsService} from '../../service/js.service';
import {Dish} from '../../model/dish';
import {OptionService} from '../../service/option/option.service';
import {Option} from '../../model/option';



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
    productOption:number[];
  }[]=[]
  cartDetailDto: {
    dish:Dish,
    quantity:number
    productOption:Option[]
  }[]=[]
  optionList: Option[]
  dish:Dish[];
  @Input()
  refreshNum = 0;
  billValue=0;
  currentUser: any;
  loggedIn = false;

  constructor(
    private  js: JsService,
    private authService: AuthService,
              private cartService: CartService,
              private notificationService: NotificationService,
              private router: Router,
    private  optionService:OptionService
  ) {
  }

  ngOnInit() {
    this.js.jsActive()
    this.getAllOption();
    this.summaryBill();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCurrentUserCarts();
  }
  getAllOption() {
    let cartId= JSON.parse(sessionStorage.getItem("cartId"));
    if (cartId!=null) {
      this.cartService.getAllDetailByCartId(cartId).subscribe((res: any[]) => {
        this.cartDetailDto = res;
      })
    }
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
    this.getAllOption();
      this.cartDetailDto[index].quantity=this.cartDetailDto[index].quantity + 1;
    this.summaryBill()
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
  }

  decreaseDishQuantity(index: number) {
    this.getAllOption();
    this.cartDetailDto[index].quantity=this.cartDetailDto[index].quantity - 1;
    this.summaryBill()
    if(this.cartDetailDto[index].quantity==0) {
      this.removeDishOfCart(index)
    }
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
  }
  removeDishOfCart(index: number) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
    this.cartDetailList.splice(index,1);
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
    this.getAllOption();
    this.summaryBill()
  }

  summaryBill(){
    this.billValue=0;
    if(this.cartDetailList.length>0) {
    for (let i = 0; i < this.cartDetailList.length; i++) {
      let productPrice=this.cartDetailList[i].dish.price;
      let  quantity= this.cartDetailList[i].quantity;
      this.billValue+=productPrice*quantity;
    }


  }else {
      this.billValue=0;
    }
  }
}
