import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';

import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../service/category/category.service';
import {Dish} from '../../../model/dish';
import {FormGroup} from '@angular/forms';
import {Category} from '../../../model/category';
import {DishService} from '../../../service/product/dish.service';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})

export class ProdListComponent implements OnInit {
  ProductList: Dish[];
  form  : FormGroup;
  selectItem:number;
  categories: Category[];
  pageDisplay1:number

  constructor(    private  js: JsService,
                  private dishService: DishService,
                  private router: Router,
                  private activatedRoute: ActivatedRoute,
                  private categoryService:CategoryService) {
 }

  ngOnInit() {
      this.js.jsActive();
      this.getAllDishes(0);
  }

  getAllDishes(page:number) {
    this.dishService.getAll(page).subscribe(res => {
      this.ProductList = res.content;
    });
  }
}
