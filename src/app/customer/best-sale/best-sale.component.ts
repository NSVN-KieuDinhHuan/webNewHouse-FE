import { Component, OnInit } from '@angular/core';
import {Dish} from '../../model/dish';
import {FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
import {JsService} from '../../service/js.service';
import {DishService} from '../../service/product/dish.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryService} from '../../service/category/category.service';
declare var $: any;
@Component({
  selector: 'app-best-sale',
  templateUrl: './best-sale.component.html',
  styleUrls: ['./best-sale.component.css']
})
export class BestSaleComponent implements OnInit {

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

    this.getCategoryList();
    this.getDishByCategory();
    this.getAllDishes();
    $('#0').hide();

  }

  getAllDishes() {
    this.dishService.findAll().subscribe(res => {
      this.ProductList = res
    });
  }

  getDishByCategory() {
    this.categoryId=  $('#categoryId').val();
    if(this.categoryId==0) {
      this.getAllDishes();
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
    this.getAllDishes()
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

    this.getAllDishes()

  }
}
