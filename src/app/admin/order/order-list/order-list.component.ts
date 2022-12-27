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
import {OrderService} from '../../../service/order/order.service';
import {OrderDto} from '../../../model/orderDto';
import {OrderGroup} from '../../../model/OrderGroup';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList:OrderDto[]=[]
  orderGroup:OrderGroup[]=[]
  categories:Category[]=[]
  orderSum:any[]=[]
  constructor(    private  js: JsService,
                  private dishService: DishService,
                  private router: Router,
                  private cartService: CartService,
                  private activatedRoute: ActivatedRoute,
                  private orderService:OrderService,
                  private categoryService:CategoryService) { }

  ngOnInit() {
    this.getCategoryList()
    this.getOrderAll()
    this.getOrderGroupAll()

  }
  getCategoryList() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories=res
    })
  }

  getOrderAll() {
  this.orderService.getOrderAll().subscribe(res => {
    this.orderList=res
    for (let i = 0; i < this.orderList.length; i++) {
      let ordersumDetail= {
        username: this.orderList[i].orderGroup.User.username

      }
    }


  })



}

  getOrderGroupAll() {
    this.orderService.getOrderGroupAll().subscribe(res => {
      this.orderGroup=res


    })

  }

}
