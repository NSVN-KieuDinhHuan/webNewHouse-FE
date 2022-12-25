import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/category';
import {JsService} from '../../../service/js.service';

import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../service/category/category.service';
import {DishService} from '../../../service/product/dish.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories:Category[]
  constructor(    private  js: JsService,
                  private dishService: DishService,
                  private router: Router,
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

}
