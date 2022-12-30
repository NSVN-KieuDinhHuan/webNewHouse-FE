import {Component, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cart} from '../../model/cart';
import {CartDetailDto} from '../../model/cartDetailDto';
import {CartDetail} from '../../model/cart-detail';
import {Dish} from '../../model/dish';
import {UserToken} from '../../model/user-token';
import {UseService} from '../../service/use/use.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../../service/cart/cart.service';
import {JsService} from '../../service/js.service';
import {AuthService} from '../../service/auth/auth.service';
import {NotificationService} from '../../service/notification/notification.service';
import {DishService} from '../../service/product/dish.service';
import {OrderService} from '../../service/order/order.service';
import {Order} from '../../model/order';
import {environment} from '../../../environments/environment';
import {OrderGroup} from '../../model/OrderGroup';
import {Category} from '../../model/category';
import {OrderDto} from '../../model/orderDto';
import {Option} from '../../model/option';
import {CategoryService} from '../../service/category/category.service';
import {OptionService} from '../../service/option/option.service';
import {User} from '../../model/user';
declare var Swal: any;
const IMG_URL = `${environment.urlImage}`;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  orderList:Order[]=[]
  orderGroup:OrderGroup[]=[]
  categories:Category[]=[]
  orderSum:OrderDto[]=[]
  product:Dish[]=[];
  optionList:Option[]=[]
  imgUrl: string = IMG_URL;
  user: User;
  orderSumUser:OrderDto[]=[]

  constructor(    private  js: JsService,
                  private dishService: DishService,
                  private router: Router,
                  private cartService: CartService,
                  private activatedRoute: ActivatedRoute,
                  private orderService:OrderService,
                  private categoryService:CategoryService,
                  private optionService:OptionService) {
    this.user= JSON.parse(sessionStorage.getItem("user"));
  }

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
        let getProduct=this.product.filter(x => {return x.id==this.orderList[i].dishId})[0]

        let ordersumDetail: OrderDto = {
          user: this.orderList[i].orderGroup.user,
          product: getProduct,
          optionList :this.orderList[i].optionList,
          quantity: this.orderList[i].quantity,
          CreateDate: this.orderList[i].orderGroup.createDate,
          status: this.orderList[i].orderGroup.status
        }
        this.orderSum.push(ordersumDetail);
      }
     this.orderSumUser = this.orderSum.filter(x => {return x.user.phone==this.user.phone})

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
