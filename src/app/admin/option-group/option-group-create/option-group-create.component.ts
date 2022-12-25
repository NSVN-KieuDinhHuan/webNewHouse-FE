import { Component, OnInit } from '@angular/core';
import {OptionGroup} from '../../../model/optionGroup';
import {JsService} from '../../../service/js.service';

import {ActivatedRoute, Router} from '@angular/router';
import {OptionService} from '../../../service/option/option.service';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DishService} from '../../../service/product/dish.service';

@Component({
  selector: 'app-option-group-create',
  templateUrl: './option-group-create.component.html',
  styleUrls: ['./option-group-create.component.css']
})
export class OptionGroupCreateComponent implements OnInit {

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
  optionGroupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get optionFormControl() {
    return this.optionGroupForm.controls;
  }

  getAllOptionGroup() {
    this.optionService.getOptionGroupAll().subscribe(res => {
      this.optionGroupList = res;
    });
  }
  submit() {
    const formData = new FormData();
    formData.append('name', this.optionGroupForm.value.name);
    if (this.optionGroupForm.valid) {
      this.optionService.saveOptionGroup(formData).subscribe(() => {
        this.notificationService.showSuccessMessage('Success');
        this.router.navigateByUrl("/admin/option-group/list")
      }, error => this.notificationService.showErrorMessage('Error'));
      this.optionGroupForm.reset();
    }
  }

}
