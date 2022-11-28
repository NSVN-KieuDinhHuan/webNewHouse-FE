import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';
import {Dish} from '../../model/dish';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cartDetailList: {
    dish:Dish,
    quantity:number
  }[]
  cartLength: number;
  constructor(private  js: JsService) {
    this.cartDetailList =  JSON.parse(sessionStorage.getItem("cartDetailList"))
    if (this.cartDetailList) {
    this.cartLength=this.cartDetailList.length;
    }
  }

  ngOnInit() {
    this.js.jsActive()
  }
}
