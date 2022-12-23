import { Component, OnInit } from '@angular/core';
import {Dish} from '../../../model/dish';
import {JsService} from '../../../service/js.service';
import {DishService} from '../../../service/dish/dish.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {OptionService} from '../../../service/option/option.service';
import {Option} from '../../../model/option';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})
export class OptionListComponent implements OnInit {
  optionList: Option[];
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
    this.getAllOption()
  }

  getAllOption() {
    this.optionService.getAll().subscribe(res => {
      this.optionList = res;
    });
  }
}
