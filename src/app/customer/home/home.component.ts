import { Component, OnInit } from '@angular/core';
import {JsService} from '../../service/js.service';
declare  var WOW:any;
declare  var jQuery:any;
declare  var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private  js: JsService) {

  }

  ngOnInit() {
   this.js.jsActive()
  }

}
