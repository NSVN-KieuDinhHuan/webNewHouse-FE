import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';
import {DishService} from '../../../service/dish/dish.service';

import {CategoryService} from '../../../service/category/category.service';

import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Dish} from '../../../model/dish';
import {Category} from '../../../model/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ProductList: Dish[];
  form  : FormGroup;
  selectItem:any;
  categories: Category[];
  pageDisplay1:number


  constructor(
    private  js: JsService,
    private dishService: DishService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoryService) {
    this.js.jsActive();


  }

   ngOnInit() {
     this.pageDisplay1=0
    this.getCategoryList();
    this.getAllDishes(this.pageDisplay1);

    }

  getAllDishes(page:number) {
    this.selectItem=0;
    this.dishService.getAll(page).subscribe(res => {
      this.ProductList = res.content;
    });
  }
  getDishByCategory(category_id:number) {
    this.selectItem=category_id;
    if(category_id==0) {
      this.getAllDishes(0);
    }
    if (category_id!=0) {
    this.dishService.getDishbyCategoryID(category_id).subscribe(res => {
      if(res) {
      this.ProductList = res;
      }
    });
    }
  }

    getCategoryList() {
      this.categoryService.getAllCategory().subscribe(res => {
         this.categories=res
      })
     }

     nextPage(){
       this.pageDisplay1+=1;
       this.getAllDishes(this.pageDisplay1)
       if(this.ProductList.length==0){
         this.pageDisplay1-=1;
       }

     }

     backPage(){
       this.pageDisplay1-=1;
       if(this.pageDisplay1<0){
         this.pageDisplay1=0
       }
       this.getAllDishes(this.pageDisplay1)
     }
}
