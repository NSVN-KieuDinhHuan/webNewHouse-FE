import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UseService} from '../../service/use/use.service';
import {Router} from '@angular/router';
import {JsService} from '../../service/js.service';
import {NotificationService} from '../../service/notification/notification.service';
import {Cart} from '../../model/cart';
import {Dish} from '../../model/dish';
import {CartService} from '../../service/cart/cart.service';
import {AuthService} from '../../service/auth/auth.service';
import {UserToken} from '../../model/user-token';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
  });

  carts: Cart[] = [];
  cartDetailList: {
    dish:Dish,
    quantity:number
  }[]
  dish:Dish[];
  billValue=0;
  currentUser: UserToken = {};
  loggedIn = false;

  constructor(private userService: UseService,
              private router: Router,
              private cartService: CartService,
              private  js: JsService,
              private authService: AuthService,
              private notificationService: NotificationService,
              ) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
  }
  ngOnInit() {
    this.js.jsActive()
    this.summaryBill();
  }
  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }

  get phone() {
    return this.registerForm.get('phone');
  }
  get address() {
    return this.registerForm.get('address');
  }

  register() {
    sessionStorage.removeItem("cartId")
    if (this.registerForm.valid) {
      const user = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        phone: this.registerForm.value.phone,
        address: this.registerForm.value.address,
      };
      this.userService.register(user).subscribe(() => {
        this.authService.login(this.registerForm.value.email, "Newhouse2022").subscribe((data) => {
           sessionStorage.setItem('user', JSON.stringify(user));
        });

        alert("Đơn hàng thành công")

      }, error => {
        this.notificationService.showMessage('error', error.error.message);
      });
    }
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
    this.summaryBill()
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
  }

  decreaseDishQuantity(index: number) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
    this.cartDetailList[index].quantity=this.cartDetailList[index].quantity - 1;
    this.summaryBill()
    if(this.cartDetailList[index].quantity==0) {
      this.removeDishOfCart(index)
    }
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
  }
  removeDishOfCart(index: number) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
    this.cartDetailList.splice(index,1)
    sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
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
