import { Component, OnInit } from '@angular/core';
import {Option} from '../../../model/option';
import {OptionGroup} from '../../../model/optionGroup';
import {JsService} from '../../../service/js.service';
import {DishService} from '../../../service/product/dish.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OptionService} from '../../../service/option/option.service';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {OrderService} from '../../../service/order/order.service';
import {Order} from '../../../model/order';
import {OrderGroup} from '../../../model/OrderGroup';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  orderGroups:OrderGroup[];
  orderGroup:OrderGroup
  optionGroupList:OptionGroup[]
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
  constructor(private js: JsService,
              private dishService: DishService,
              private activatedRoute : ActivatedRoute,
              private router: Router,
              private optionService:OptionService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cartService: CartService,
              private orderService:OrderService,
              private categoryService:CategoryService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('option-id');

    })
  }
  ngOnInit() {

  }

}
