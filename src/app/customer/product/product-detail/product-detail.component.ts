import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';
import {Dish} from '../../model/dish';
import {DishService} from '../../../service/dish/dish.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../service/auth/auth.service';
import {Cart} from '../../model/cart';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CartDetail} from '../../model/cart-detail';
import {NotificationService} from '../../../service/notification/notification.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Dish=null;
  loggedIn: boolean;
  currentUser: any;
  cart: Cart;
  cartDetailList:CartDetail[]
  addProductForm: FormGroup = new FormGroup({
    quantity: new FormControl(1),
  });
  constructor(private  js: JsService,
  private dishService: DishService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              ) {
  }
  get quantity() {
    return this.addProductForm.get('quantity');
  }
  ngOnInit() {
    this.js.jsActive()
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('product-id');
      this.getDetailProduct(id);
      this.checkLoginAndGetInfo();
      this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
      if (this.cartDetailList==null) {
        this.cartDetailList=[];
      }
    })
  }
  checkLoginAndGetInfo() {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = this.authService.getCurrentUser();
    }

  }
  addDishIntoCart() {
    if (this.addProductForm.valid) {
      const cartDetail = {
        dish: this.product,
        quantity: this.addProductForm.value.quantity,
      };
      this.cartDetailList.push(cartDetail);
      sessionStorage.setItem('cartDetailList', JSON.stringify(this.cartDetailList));
      this.notificationService.showTopRightMessage('success', 'Đăng ký thành công');
    }

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
      }
    });
  }
}
