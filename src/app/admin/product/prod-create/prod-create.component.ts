import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/user';
import {UserToken} from '../../../model/user-token';
import {JsService} from '../../../service/js.service';
import {DishService} from '../../../service/dish/dish.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {CartService} from '../../../service/cart/cart.service';
import {CategoryService} from '../../../service/category/category.service';
import {Category} from '../../../model/category';
declare var $: any;
@Component({
  selector: 'app-prod-create',
  templateUrl: './prod-create.component.html',
  styleUrls: ['./prod-create.component.css']
})

export class ProdCreateComponent implements OnInit {
  image1:string="assets/dist/img/prod-1.jpg";
  image2:string="assets/dist/img/prod-2.jpg";
  image3:string="assets/dist/img/prod-3.jpg";
  image4:string="assets/dist/img/prod-4.jpg";
  image5:string="assets/dist/img/prod-4.jpg";
  image6:string="assets/dist/img/prod-3.jpg";
  image7:string="assets/dist/img/prod-2.jpg";
  image8:string="assets/dist/img/prod-1.jpg";
  categories: Category[];
  constructor(    private js: JsService,
                  private dishService: DishService,
                  private activatedRoute : ActivatedRoute,
                  private router: Router,
                  private authService: AuthService,
                  private notificationService: NotificationService,
                  private cartService: CartService,
                  private categoryService:CategoryService) {

  }
  ngOnInit() {
  this.getCategoryList();
  }
  user: User = {};
  currentUser: UserToken = {};
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    image: new FormControl('')
  });
  getCategoryList() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.categories=res
    })
  }
  submit() {
    const formData = new FormData();
    formData.append('username', this.productForm.value.username);
    formData.append('phoneNumber', this.productForm.value.phoneNumber);
    formData.append('address', this.productForm.value.address);

    const files = (document.getElementById('image1') as HTMLInputElement).files;
     if (files.length > 0) {
       formData.append('image', files[0]);
     }


  }


}
