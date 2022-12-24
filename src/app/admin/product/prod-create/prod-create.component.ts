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
import {OptionGroup} from '../../../model/optionGroup';
import {OptionService} from '../../../service/option/option.service';
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
  this.js();
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

  getAllOptionGroup() {
    this.optionService.getOptionGroupAll().subscribe(res => {
      this.optionGroupList = res;
    });
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

  Js() {
    Dropzone.autoDiscover = false

    // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
    var previewNode = document.querySelector("#template")
    previewNode.id = ""
    var previewTemplate = previewNode.parentNode.innerHTML
    previewNode.parentNode.removeChild(previewNode)

    var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
      url: "/target-url", // Set the url
      thumbnailWidth: 80,
      thumbnailHeight: 80,
      parallelUploads: 20,
      previewTemplate: previewTemplate,
      autoQueue: false, // Make sure the files aren't queued until manually added
      previewsContainer: "#previews", // Define the container to display the previews
      clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    })

    myDropzone.on("addedfile", function(file) {
      // Hookup the start button
      file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file) }
    })

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function(progress) {
      document.querySelector("#total-progress .progress-bar").style.width = progress + "%"
    })

    myDropzone.on("sending", function(file) {
      // Show the total progress bar when upload starts
      document.querySelector("#total-progress").style.opacity = "1"
      // And disable the start button
      file.previewElement.querySelector(".start").setAttribute("disabled", "disabled")
    })

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function(progress) {
      document.querySelector("#total-progress").style.opacity = "0"
    })

    // Setup the buttons for all transfers
    // The "add files" button doesn't need to be setup because the config
    // `clickable` has already been specified.
    document.querySelector("#actions .start").onclick = function() {
      myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED))
    }
    document.querySelector("#actions .cancel").onclick = function() {
      myDropzone.removeAllFiles(true)
    }
  }
}
