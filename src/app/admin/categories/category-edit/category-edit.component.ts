import { Component, OnInit } from '@angular/core';
import {OptionGroup} from '../../../model/optionGroup';
import {JsService} from '../../../service/js.service';

import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {OptionService} from '../../../service/option/option.service';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryDto} from '../../../model/categoryDto';
import {DishService} from '../../../service/product/dish.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: CategoryDto
  optionGroupList:OptionGroup[]
  constructor(private js: JsService,
              private dishService: DishService,
              private activatedRoute : ActivatedRoute,
              private router: Router,
              private optionService:OptionService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cartService: CartService,
              private categoryService:CategoryService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getCategoryrById(id);
    })
  }

  getCategoryrById(id) {
    this.categoryService.getCategoryById(id).subscribe((category) => {
      this.category = category;
      this.categoryFormControl.name.setValue(this.category.name);
      this.categoryFormControl.description.setValue(this.category.description);
      this.categoryFormControl.image.setValue(this.category.image);

    });
  }
  ngOnInit() {
    this.getAllOptionGroup()
  }
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  get categoryFormControl() {
    return this.categoryForm.controls;
  }

  getAllOptionGroup() {
    this.optionService.getOptionGroupAll().subscribe(res => {
      this.optionGroupList = res;
    });
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.categoryForm.value.name);
    formData.append('description', this.categoryForm.value.description);
    formData.append('image', (document.getElementById('image') as HTMLInputElement).files[0]);
    if (this.categoryForm.valid) {
      this.categoryService.UpdateCategory(this.category.id,formData).subscribe(() => {
        this.notificationService.showSuccessMessage('Success');
        this.router.navigateByUrl("/admin/category/list")
      }, error => this.notificationService.showErrorMessage('Error'));
      this.categoryForm.reset();
    }
  }
}
