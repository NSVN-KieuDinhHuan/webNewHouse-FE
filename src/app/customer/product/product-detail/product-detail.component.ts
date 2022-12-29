import {Component, Input, OnInit} from '@angular/core';
import {JsService} from '../../../service/js.service';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../service/notification/notification.service';
import {Dish} from '../../../model/dish';
import {Cart} from '../../../model/cart';

import {CartService} from '../../../service/cart/cart.service';
import {DishService} from '../../../service/product/dish.service';
import {OptionService} from '../../../service/option/option.service';
import {OptionGroup} from '../../../model/optionGroup';
import {Option} from '../../../model/option';
import {environment} from '../../../../environments/environment';
declare var $: any;
declare var Swal: any;

const IMG_URL = `${environment.urlImage}`;
@Component({
  selector: 'app-product-create',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Dish = null;
  loggedIn: boolean;
  currentUser: any;
  cart: Cart;
  cartAll: Cart[];
  optionGroups: Option[][] = [];
  optionOfProduct: number[] = [];
  addProductForm: FormGroup = new FormGroup({
    quantity: new FormControl(1),
  });
  cartId = 0;
  price = 0;
  mainProductImg: string;
  optionAll: Option[];
  length: number;

  constructor(
              private  js: JsService,
              private dishService: DishService,
              private activatedRoute: ActivatedRoute,
              private optionService: OptionService,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cartService: CartService
              ) {

  }

  ngOnInit() {
    this.js.jsActive();
    this.getAllOption();
    this.quantity.setValue( 1);
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('product-id');
      this.getDetailProduct(id);
      this.checkLoginAndGetInfo();
      this.createCart();
      this.selectOption();
    })
  }
  get quantity() {
     return this.addProductForm.get('quantity');
  }
  showMessage() {
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      Swal.fire({
        icon: 'success',
        title: 'Thêm thành công',
        showConfirmButton: false,
        timer: 2000
      });
    });

  }
  createCart(){
   this.cartId = JSON.parse(sessionStorage.getItem('cartId'));
   this.cartService.findAllCartGroup().subscribe((res: Cart[]) => {
     this.cartAll = res;
     let CartId = this.cartAll.length +1;
     if(this.cartId != null && res.length==0) {
       sessionStorage.removeItem("cartId")
       this.cartId=null;
     }
     if(this.cartId == null) {
        this.cartService.createCartGroup(CartId).subscribe(() => {
            sessionStorage.setItem('cartId', JSON.stringify(CartId));
       })
     }
   });
   }

  getOptionGroup(){
    if(this.product!=null){
    for (let i = 0; i < this.product.optionGroups.length; i++) {
      this.optionService.getOptionByOptionGroup(this.product.optionGroups[i].id).subscribe((res) => {
        this.optionGroups.push(res);
      })
    }
    }
  }



  checkLoginAndGetInfo() {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = this.authService.getCurrentUser();
    }

  }

  selectOption() {
    this.optionOfProduct = [];
    if (this.product != null) {
       const optionList = this.product.optionGroups;
       this.price = this.product.price;
       for (let i = 0; i < optionList.length; i++) {
         let option: number;
         const nameId = optionList[i].id.toString();
         option = $('#' + nameId).val();
      this.optionOfProduct.push(Number(option))
      this.optionAll.forEach(x=>{
        if(x.id==option) {
          this.price=this.price+x.price
        }
      })
     }
    }
  }


  getAllOption() {
    this.optionService.getAll().subscribe(res => {
      this.optionAll = res;
    });
  }
  addDishIntoCart() {
    this.selectOption();
    if (this.addProductForm.valid) {
      const cartId = JSON.parse(sessionStorage.getItem('cartId'));
      const cartDetail = {
        dishId: this.product.id,
        quantity: this.quantity.value,
        optionList: this.optionOfProduct,
        cartGroupId : cartId
      };
      this.cartService.addDishToCart(cartDetail).subscribe(() => {
      this.showMessage();
      });

    }
}
   increaseQuantity() {
     this.quantity.setValue( this.quantity.value + 1);
  }
  decreaseQuantity() {
    this.quantity.setValue( this.quantity.value - 1);
  }
  setImgMain(img: string) {
    this.mainProductImg = img;
  }
  getDetailProduct(id: number) {

    this.dishService.getById(id).subscribe(res => {
      if (res) {
      this.product = res;
      this.price = this.product.price;
      this.getOptionGroup();
      if (this.product.image01 != null) {
        this.product.image01 = IMG_URL + res.image01;
      }
      if (this.product.image02 != null) {
        this.product.image02 = IMG_URL + res.image02;
      }
      if (this.product.image03 != null) {
        this.product.image03 = IMG_URL + res.image03;
      }
      if (this.product.image04 != null) {
        this.product.image04 = IMG_URL + res.image04;
      }
      if (this.product.image05 != null) {
        this.product.image05 = IMG_URL + res.image05;
      }
      if (this.product.image06 != null) {
        this.product.image06 = IMG_URL + res.image06;
      }
      if (this.product.image07 != null) {
        this.product.image07 = IMG_URL + res.image07;
      }
      if (this.product.image08 != null) {
        this.product.image08 = IMG_URL + res.image08;
      }
      this.setImgMain(this.product.image01);
      }
    });


  }
}
