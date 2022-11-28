import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';
import {DishService} from '../../../service/dish/dish.service';
import {Dish} from '../../model/dish';
import {CategoryService} from '../../../service/category/category.service';
import {Category} from '../../model/category';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ProductList: Dish[] = [];
  categoryAll:Category[]=[{ id:1,name:"Đồng Hồ"}]

  form  = new FormGroup({
    category: new FormControl(),
  });
  get category() {
    return this.form.get('category');
  }

  constructor(private  js: JsService,
  private dishService: DishService,
  private categoryService:CategoryService) {
  }

  ngOnInit() {
    this.js.jsActive();
    this.getAllCategory();
    this.getAllDishes(0);
  }


  getAllDishes(page:number) {
    this.dishService.getAll(page).subscribe(res => {
      this.ProductList = res.content;
    });
  }
  getDishByCategory(category_id:number) {
    this.dishService.getDishbyCategoryID(category_id).subscribe(res => {
      this.ProductList = res;
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categoryAll=res;
    });
  }

}
