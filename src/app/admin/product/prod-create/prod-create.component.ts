import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/user';
import {UserToken} from '../../../model/user-token';
import {JsService} from '../../../service/js.service';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {Category} from '../../../model/category';
import {OptionGroup} from '../../../model/optionGroup';
import {OptionService} from '../../../service/option/option.service';
import {DishService} from '../../../service/product/dish.service';
declare var $: any;
const API_URL = "http://localhost:8080/image/"
@Component({
  selector: 'app-prod-create',
  templateUrl: './prod-create.component.html',
  styleUrls: ['./prod-create.component.css']
})

export class ProdCreateComponent implements OnInit {
  image1:string="";
  image2:string="";
  image3:string="";
  image4:string="";
  image5:string="";
  image6:string="";
  image7:string="";
  image8:string="";
  categories: Category[];
  optionGroupList: OptionGroup[];
  constructor(    private js: JsService,
                  private dishService: DishService,
                  private activatedRoute : ActivatedRoute,
                  private router: Router,
                  private authService: AuthService,
                  private notificationService: NotificationService,
                  private cartService: CartService,
                  private categoryService:CategoryService,
                  private optionService:OptionService) {



  }
  ngOnInit() {
  this.getCategoryList();
  this.getAllOptionGroup();
  }

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    categories: new FormControl('', [Validators.required]),
    optionGroups: new FormControl(''),
    description: new FormControl(''),
    specifications: new FormControl(''),
    image1: new FormControl(''),
    image2: new FormControl(''),
    image3: new FormControl(''),
    image4: new FormControl(''),
    image5: new FormControl(''),
    image6: new FormControl(''),
    image7: new FormControl(''),
    image8: new FormControl(''),

  });
  getCategoryList() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories=res
    })
  }

  getAllOptionGroup() {
    this.optionService.getOptionGroupAll().subscribe(res => {
      this.optionGroupList = res;
    });
  }
  submit() {
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('categories', this.productForm.value.categories);
    formData.append('optionGroups', this.productForm.value.optionGroups);
    formData.append('description', this.productForm.value.description);
    formData.append('specifications', this.productForm.value.specifications);


    const files1= (document.getElementById('image1') as HTMLInputElement).files;
     if (files1.length > 0) {
       formData.append('image', files1[0]);
     }
    const files2 = (document.getElementById('image2') as HTMLInputElement).files;
    if (files2.length > 0) {
      formData.append('image', files2[0]);
    }
    const files3 = (document.getElementById('image3') as HTMLInputElement).files;
    if (files3.length > 0) {
      formData.append('image', files3[0]);
    }
    const files4 = (document.getElementById('image4') as HTMLInputElement).files;
    if (files4.length > 0) {
      formData.append('image', files4[0]);
    }
    const files5 = (document.getElementById('image5') as HTMLInputElement).files;
    if (files5.length > 0) {
      formData.append('image', files5[0]);
    }
    const files6 = (document.getElementById('image6') as HTMLInputElement).files;
    if (files6.length > 0) {
      formData.append('image', files6[0]);
    }
    const files7 = (document.getElementById('image7') as HTMLInputElement).files;
    if (files7.length > 0) {
      formData.append('image', files7[0]);
    }
    const files8 = (document.getElementById('image8') as HTMLInputElement).files;
    if (files8.length > 0) {
      formData.append('image', files8[0]);
    }

    if (this.productForm.valid) {
      this.dishService.createDish(formData).subscribe(() => {
        this.notificationService.showSuccessMessage('Success');
        this.router.navigateByUrl("/admin/product/list")
      }, error => this.notificationService.showErrorMessage('Error'));

    }


  }

}
