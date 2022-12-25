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

import {DishService} from '../../../service/product/dish.service';
import {Option} from '../../../model/option';

@Component({
  selector: 'app-option-edit',
  templateUrl: './option-edit.component.html',
  styleUrls: ['./option-edit.component.css']
})
export class OptionEditComponent implements OnInit {
  option:Option;
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
      const id = +paramMap.get('option-id');
      this.getOptionrById(id);
    })
  }

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
  getOptionrById(id) {
    this.optionService.getById(id).subscribe((option) => {
      this.option = option;
      this.optionFormControl.name.setValue(this.option.name);
      this.optionFormControl.price.setValue(this.option.price);
      this.optionFormControl.group.setValue(this.option.optionGroup.id);

    });
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
      this.optionService.editSong(this.option.id,formData).subscribe(() => {
        this.notificationService.showSuccessMessage('Success');
        this.router.navigateByUrl("/admin/option/list")
      }, error => this.notificationService.showErrorMessage('Error'));
      this.optionForm.reset();
    }
  }

}
