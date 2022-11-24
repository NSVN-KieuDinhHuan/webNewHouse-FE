import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private  js: JsService) {

  }

  ngOnInit() {
    this.js.jsActive()
  }
}
