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
import {CartDetailDto} from '../../model/cartDetailDto';
import {CartDetail} from '../../model/cart-detail';

import {OrderService} from '../../service/order/order.service';

import {DishService} from '../../service/product/dish.service';
import {OrderDto} from '../../model/orderDto';
import {OrderGroupDto} from '../../model/OrderGroupDto';
import {Order} from '../../model/order';
import {environment} from '../../../environments/environment';
declare var Swal: any;
const IMG_URL = `${environment.urlImage}`;
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
  imgUrl: string = IMG_URL;
  carts: Cart[] = [];
  cartDetailDto:CartDetailDto[]=[];
  cartDetailList:CartDetail[]=[]
  ProductList: Dish[];
  cartId:number
  quantity:number=1
  billValue=0;
  currentUser: UserToken = {};
  loggedIn = false;
  cartLength=0;

  constructor(private userService: UseService,
              private router: Router,
              private cartService: CartService,
              private  js: JsService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private dishService: DishService,
              private orderService: OrderService,
              private authenticationService: AuthService
              ) {

  }
  ngOnInit() {
    this.js.jsActive()
    this.getAllDishes();
    this.cartId= JSON.parse(sessionStorage.getItem("cartId"));
    this.getAllCart();
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
    if (this.registerForm.valid) {
      const user = {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        phone: this.registerForm.value.phone,
        address: this.registerForm.value.address,
      };
      this.userService.register(user).subscribe(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
        let dateTime=new Date().toJSON().slice(0,10).replace(/-/g,'/')
        const orderGroupDto = {
          createDate: new Date(dateTime),
          userPhone:user.phone,
          status:0,
        }
        this.orderService.saveOrderGroup(orderGroupDto).subscribe((res ) => {
          let orderGroup:OrderGroupDto=res;
          let orderDtoList = [];
          for (let i = 0; i < this.cartDetailList.length; i++) {
            const order: Order = {
              dishId: this.cartDetailList[i].dish.id,
              quantity: this.cartDetailList[i].quantity,
              optionList: this.cartDetailList[i].options,
              orderGroup: res
            }
            orderDtoList.push(order);
          }

          this.orderService.saveOrder(orderDtoList).subscribe((res) => {
            this.notificationService.showMessage('success', "Đặt hàng thành công");
            this.cartService.emptyCart(this.cartId).subscribe((res) => {
              this.router.navigateByUrl('newhouse/history');
            })
          })
        })

      }, error => {
        this.notificationService.showMessage('error', error.error.message);
      });
    }
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/newhome');
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

  makeEmptyCart() {

  }
  getAllDishes() {
    this.dishService.findAll().subscribe((res) => {
      this.ProductList = (<Dish[]> res);
    });
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

  increaseDishQuantity(index: number,id:number) {
    this.cartDetailList[index].quantity=this.cartDetailList[index].quantity+1;
    this.summaryBill();
    this.cartService.increaseQuantity(id).subscribe(
      () => {

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
