import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private  js: JsService) {

  }

  ngOnInit() {
    this.js.jsActive()
  }
}
