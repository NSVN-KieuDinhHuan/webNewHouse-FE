import { Component, OnInit } from '@angular/core';
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
declare var $: any
declare var Swal: any;
declare var toastr: any;
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
  optionGroups:Option[][] =[];
  optionOfProduct:number[]=[];
  addProductForm: FormGroup = new FormGroup({
    quantity: new FormControl(1),
  });
  cartId:number=0;
  price:number=0;
  mainProductImg:string;
  optionAll:Option[]
  length:number;

  constructor(
              private  js: JsService,
              private dishService: DishService,
              private activatedRoute: ActivatedRoute,
              private optionService:OptionService,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cartService: CartService
              ) {
    this.length=5
  }

  ngOnInit() {
    this.js.jsActive()
    this.getAllOption();
    this.quantity.setValue( 1)
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
    $(function() {
      Swal.fire({
        icon: 'success',
        title: "Thêm thành công",
        showConfirmButton: false,
        timer: 2000
      });
    });

  }
  createCart(){
   this.cartId= JSON.parse(sessionStorage.getItem("cartId"));
   this.cartService.findAllCartGroup().subscribe((res:Cart[]) => {
     this.cartAll=res;
     let CartId=this.cartAll.length +1;
     if(this.cartId!=null && res.length==0) {
       sessionStorage.removeItem("cartId")
       this.cartId=null;
     }
     if(this.cartId==null) {
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
    this.optionOfProduct=[]
    let optionList= this.product.optionGroups;
    let SelectOption=[];
    let SelectOptionName=[];
    this.price= this.product.price;
    for (let i = 0; i < optionList.length; i++) {
      let option:number;
      let nameId=optionList[i].id.toString()
       option = $('#'+nameId).val();
      this.optionOfProduct.push(Number(option))
      this.optionAll.forEach(x=>{
        if(x.id==option) {
          this.price=this.price+x.price
        }
      })
    }
  }


  getAllOption() {
    this.optionService.getAll().subscribe(res => {
      this.optionAll = res;
    });
  }
  addDishIntoCart() {
    this.selectOption()
    if (this.addProductForm.valid) {
      let cartId= JSON.parse(sessionStorage.getItem("cartId"));
      const cartDetail = {
        dishId: this.product.id,
        quantity: this.quantity.value,
        optionList:this.optionOfProduct,
        cartGroupId:cartId
      };
      this.cartService.addDishToCart(cartDetail).subscribe(() => {
      this.showMessage()
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
        this.price=this.product.price
        this.getOptionGroup();
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
