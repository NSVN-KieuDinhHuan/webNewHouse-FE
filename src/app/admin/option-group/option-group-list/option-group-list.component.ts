import { Component, OnInit } from '@angular/core';

import {JsService} from '../../../service/js.service';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {OptionService} from '../../../service/option/option.service';
import {OptionGroup} from '../../../model/optionGroup';
import {DishService} from '../../../service/product/dish.service';



@Component({
  selector: 'app-option-group-list',
  templateUrl: './option-group-list.component.html',
  styleUrls: ['./option-group-list.component.css']
})
export class OptionGroupListComponent implements OnInit {

  optionGroupList: OptionGroup[];
  constructor(private js: JsService,
              private dishService: DishService,
              private activatedRoute : ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cartService: CartService,
              private categoryService:CategoryService,
              private optionService:OptionService) { }

  ngOnInit() {
    this.getAllOptionGroup()
  }

  getAllOptionGroup() {
    this.optionService.getOptionGroupAll().subscribe(res => {
      this.optionGroupList = res;
    });
  }
}
