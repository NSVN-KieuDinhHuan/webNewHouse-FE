import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(private  js: JsService) {

  }

  ngOnInit() {
    this.js.jsActive()
  }


}
