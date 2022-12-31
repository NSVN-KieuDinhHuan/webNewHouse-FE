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
import {Observable} from 'rxjs';
import {result} from '../../../model/result';
import {Order} from '../../../model/order';
import {OptionService} from '../../../service/option/option.service';
import {Option} from '../../../model/option';
import {environment} from '../../../../environments/environment';
declare var $: any;
const API_URL = `${environment.urlImage}`;
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderList:Order[]=[]
  orderGroup:OrderGroup[]=[]
  categories:Category[]=[]
  orderSum:OrderDto[]=[]
  product:Dish[]=[];
  optionList:Option[]=[]
  imgUrl: string = API_URL;
  statusList =[{
    id:0,
    name:"Chờ giao"
  },
    {
      id:1,
      name:"Đã giao"
    },
    {
      id:2,
      name:"hủy đơn"
    },
  ]

  constructor(    private  js: JsService,
                  private dishService: DishService,
                  private router: Router,
                  private cartService: CartService,
                  private activatedRoute: ActivatedRoute,
                  private orderService:OrderService,
                  private categoryService:CategoryService,
                  private optionService:OptionService) { }

  ngOnInit() {
    this.getAllProduct()
    this.getCategoryList()
    this.getOrderGroupAll()
    this.getOrderAll()

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
        let getProduct=this.product.filter(x => x.id==this.orderList[i].dishId)[0]
       let status="chờ giao";
      for (let j = 0; j < this.statusList.length; j++) {
        if(this.statusList[i].id==this.orderList[i].orderGroup.status){
          status =this.statusList[i].name;
        }
      }

        let ordersumDetail: OrderDto = {
          user: this.orderList[i].orderGroup.user,
          product: getProduct,
          optionList :this.orderList[i].optionList,
          quantity: this.orderList[i].quantity,
          CreateDate: this.orderList[i].orderGroup.createDate,
          status: status
        }
        this.orderSum.push(ordersumDetail);
    }


  })
}


    getAllProduct(){
    this.dishService.findAll().subscribe(res => {
      this.product= res;
    })
    }


  getOrderGroupAll() {
    this.orderService.getOrderGroupAll().subscribe(res => {
      this.orderGroup=res
    })

  }

}
