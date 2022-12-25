import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';


import {CategoryService} from '../../../service/category/category.service';

import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Dish} from '../../../model/dish';
import {Category} from '../../../model/category';
import {DishService} from '../../../service/product/dish.service';
declare var $: any;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ProductList: Dish[];
  form  : FormGroup;
  categories: Category[]=[];
  pageDisplay1:number=0
  categoryId: number=0;

  constructor(
    private  js: JsService,
    private dishService: DishService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoryService) {
    this.js.jsActive();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('category-id');
      this.getDishByCategory();
    });

  }

   ngOnInit() {
     this.pageDisplay1=0
     this.getCategoryList();
     this.getDishByCategory();
     this.getAllDishes(this.pageDisplay1);
     $('#0').hide();

    }

  getAllDishes(page:number) {
    this.dishService.getAll(page).subscribe(res => {
      this.ProductList = res.content;
    });
  }

  getDishByCategory() {
   this.categoryId=  $('#categoryId').val();
   if(this.categoryId==0) {
     this.getAllDishes(0);
   }
    if(this.categoryId!=null && this.categoryId!=0) {
      this.dishService.getDishbyCategoryID(this.categoryId).subscribe(res => {
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

       if(this.ProductList.length<9){
         this.pageDisplay1-=1;
         $('#2').hide();
       }
       this.pageDisplay1+=1;
       this.getAllDishes(this.pageDisplay1)
       $('#0').show();
     }

     backPage(){
       this.pageDisplay1-=1;
       if(this.pageDisplay1<1){
         this.pageDisplay1=0
         $('#0').hide();
       }else {
         $('#2').show();
       }

       this.getAllDishes(this.pageDisplay1)

     }

}
