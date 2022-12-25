import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OptionService} from '../../../service/option/option.service';
import {OptionGroup} from '../../../model/optionGroup';
import {DishService} from '../../../service/product/dish.service';

@Component({
  selector: 'app-option-create',
  templateUrl: './option-create.component.html',
  styleUrls: ['./option-create.component.css']
})
export class OptionCreateComponent implements OnInit {
  optionGroupList:OptionGroup[]
  constructor(private js: JsService,
              private dishService: DishService,
              private activatedRoute : ActivatedRoute,
              private router: Router,
              private optionService:OptionService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cartService: CartService,
              private categoryService:CategoryService) { }

  ngOnInit() {
    this.getAllOptionGroup()
  }
  optionForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
  });

  get optionFormControl() {
    return this.optionForm.controls;
  }

  getAllOptionGroup() {
    this.optionService.getOptionGroupAll().subscribe(res => {
      this.optionGroupList = res;
    });
  }
  submit() {
    const formData = new FormData();
    formData.append('name', this.optionForm.value.name);
    formData.append('price', this.optionForm.value.price);
    formData.append('group', this.optionForm.value.group);
    if (this.optionForm.valid) {
      this.optionService.saveOption(formData).subscribe(() => {
        this.notificationService.showSuccessMessage('Success');
        this.router.navigateByUrl("/admin/option/list")
      }, error => this.notificationService.showErrorMessage('Error'));
      this.optionForm.reset();
    }
  }
}
