import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';
import {DishService} from '../../../service/dish/dish.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../service/notification/notification.service';
import {Dish} from '../../../model/dish';
import {Cart} from '../../../model/cart';

import {CartService} from '../../../service/cart/cart.service';
declare var $: any
@Component({
  selector: 'app-product-create',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Dish=null;
  loggedIn: boolean;
  currentUser: any;
  cart: Cart;
  cartAll:Cart[];

  optionOfProduct:number[]
  addProductForm: FormGroup = new FormGroup({
    quantity: new FormControl(1),
  });
  cartId:number;

  mainProductImg:string;

  constructor(private  js: JsService,
  private dishService: DishService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cartService: CartService
              ) {
  }
  get quantity() {
     return this.addProductForm.get('quantity');
  }

  createCart(){
   this.cartId= JSON.parse(sessionStorage.getItem("cartId"));
   this.cartService.findAllCart().subscribe((res:Cart[]) => {
     this.cartAll=res;
     let CartId=this.cartAll.length +1;
     if(this.cartId!=null && res.length==0) {
       sessionStorage.removeItem("cartId")
       this.cartId=null;
     }
     if(this.cartId==null) {
        this.cartService.createCart(CartId).subscribe(() => {
            sessionStorage.setItem('cartId', JSON.stringify(CartId));
       })
     }
   });
   }


  ngOnInit() {
    this.js.jsActive()
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('product-id');
      this.getDetailProduct(id);
      this.checkLoginAndGetInfo();
      this.createCart();
    })
  }
  checkLoginAndGetInfo() {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = this.authService.getCurrentUser();
    }

  }

  selectOption() {
    let optionList= this.product.optionOfProduct;
    let SelectOption=[];
    let SelectOptionName=[];
    for (let i = 0; i < optionList.length; i++) {
      let option:number;
      let nameId=optionList[i].name.toString()
    $( document ).ready(function() {
       option = $('#'+nameId).val();
      SelectOption.push(Number(option))
    })
    }
    this.optionOfProduct=SelectOption;
  }
  addDishIntoCart() {
    this.selectOption();
    if (this.addProductForm.valid) {
      const cartDetail = {
        dishId: this.product.id,
        quantity: this.quantity.value,
        productOption:this.optionOfProduct
      };
      let cartId= JSON.parse(sessionStorage.getItem("cartId"));
      this.cartService.addDishToCart(cartDetail,cartId).subscribe(() => {
        alert('Thành công!');
        this.router.navigateByUrl("/newhouse/shop")
      })

    }
}
   increaseQuantity (){
     this.quantity.setValue( this.quantity.value+1)
  }
  decreaseQuantity (){
    this.quantity.setValue( this.quantity.value-1)
  }
  setImgMain(img:string){
    this.mainProductImg=img;
  }
  getDetailProduct(id:number) {
    const API_URL = "http://localhost:8080/image/"
    this.dishService.getById(id).subscribe(res => {
      if(res) {
      this.product = res
      if (this.product.image01 !=null) {
        this.product.image01=API_URL+res.image01;
      }
      if (this.product.image02 !=null) {
        this.product.image02=API_URL+res.image02;
      }
      if (this.product.image03 !=null) {
        this.product.image03=API_URL+res.image03;
      }
      if (this.product.image04 !=null) {
        this.product.image04=API_URL+res.image04;
      }
      if (this.product.image05 !=null) {
        this.product.image05=API_URL+res.image05;
      }
      if (this.product.image06 !=null) {
        this.product.image06=API_URL+res.image06;
      }
      if (this.product.image07 !=null) {
        this.product.image07=API_URL+res.image07;
      }
      if (this.product.image08 !=null) {
        this.product.image08=API_URL+res.image08;
      }
        this.setImgMain(this.product.image01)
      }
    });


  }
}
