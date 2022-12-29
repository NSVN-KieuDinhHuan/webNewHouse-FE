import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';


import {CategoryService} from '../../../service/category/category.service';

import { FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Dish} from '../../../model/dish';
import {Category} from '../../../model/category';
import {DishService} from '../../../service/product/dish.service';
import {environment} from '../../../../environments/environment';
declare var $: any;
const API_URL = `${environment.urlImage}`;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ProductList: Dish[];
  form: FormGroup;
  categories: Category[] = [];
  pageDisplay1 = 0;
  categoryId = 0;
  url: string = API_URL;
  classname = 'grid_sorting_button button d-flex flex-column justify-content-center align-items-center';

  constructor(
    private  js: JsService,
    private dishService: DishService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    this.js.jsActive();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('category-id');
    });

  }

   ngOnInit() {
     this.pageDisplay1 = 0;
     this.getCategoryList();
     this.getDishByCategory(0);
     this.getAllDishes(this.pageDisplay1);
     $('#0').hide();
     this.classname = 'grid_sorting_button button d-flex flex-column justify-content-center align-items-center';
     $('#category0').addClass(this.classname + ' active');
    }

  getAllDishes(page: number) {
    this.dishService.getAll(page).subscribe(res => {
      this.ProductList = res.content;
    });
  }

  getDishByCategory(id: number) {
    if (id === 0) {
     this.getAllDishes(0);
     $('#category0').addClass(this.classname + ' active');
     this.categoryId = 0;
   } else {
      $('#cate' + id).addClass(this.classname + ' active');
      if (this.categoryId === 0) {
        $('#category0').addClass(this.classname);
      } else {
        $('#cate' + this.categoryId).addClass(this.classname);
      }
    }
    // tslint:disable-next-line:triple-equals
    if (this.categoryId != null && this.categoryId != 0) {
      this.dishService.getDishbyCategoryID(this.categoryId).subscribe(res => {
        if (res) {
          this.ProductList = res;
        }
      });
      this.categoryId = id;
    }
  }


    getCategoryList() {
      this.categoryService.getAllCategory().subscribe(res => {
         this.categories = res;
      });
     }

     nextPage() {
       if (this.ProductList.length < 9) {
         this.pageDisplay1 -= 1;
         $('#2').hide();
       }
       this.pageDisplay1 += 1;
       this.getAllDishes(this.pageDisplay1);
       $('#0').show();
     }

     backPage() {
       this.pageDisplay1 -= 1;
       if (this.pageDisplay1 < 1) {
         this.pageDisplay1 = 0;
         $('#0').hide();
       } else {
         $('#2').show();
       }

       this.getAllDishes(this.pageDisplay1);

     }

}
