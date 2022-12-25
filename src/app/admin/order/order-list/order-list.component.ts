import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/category';
import {JsService} from '../../../service/js.service';
import {DishService} from '../../../service/product/dish.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../service/category/category.service';
import {CartService} from '../../../service/cart/cart.service';
import {CartDetailDto} from '../../../model/cartDetailDto';
import {CartDetail} from '../../../model/cart-detail';
import {Dish} from '../../../model/dish';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  cartDetailDto:CartDetailDto[]=[];
  cartDetailList:CartDetail[]=[]
  ProductList: Dish[];
  cartId:number
  quantity:number=1
  billValue: number=0;
  categories:Category[]
  constructor(    private  js: JsService,
                  private dishService: DishService,
                  private router: Router,
                  private cartService: CartService,
                  private activatedRoute: ActivatedRoute,
                  private categoryService:CategoryService) { }

  ngOnInit() {
    this.getCategoryList()

  }
  getCategoryList() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories=res
    })
  }

getOrderAll



}
