import { Component, OnInit } from '@angular/core';
import {JsService} from '../../service/js.service';
import {DishService} from '../../service/dish/dish.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CategoryService} from '../../service/category/category.service';
import {Dish} from '../../model/dish';
import {FormGroup} from '@angular/forms';
import {Category} from '../../model/category';
declare  var WOW:any;
declare  var jQuery:any;
declare  var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ProductList: Dish[];
  form  : FormGroup;
  selectItem:number;
  categories: Category[];
  pageDisplay1:number

  constructor(
    private  js: JsService,
    private dishService: DishService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoryService) {


  }

  ngOnInit() {
    this.pageDisplay1=0
    this.getCategoryList();

    $('#0').hide();

  }
  getCategoryList() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories=res
    })
  }

  getAllDishes(page:number) {
    this.selectItem=0;
    this.dishService.getAll(page).subscribe(res => {
      this.ProductList = res.content;
    });
  }
  getDishByCategory(category_id:number) {
    this.router.navigateByUrl('/newhouse/shop/'+category_id);
  }

}
