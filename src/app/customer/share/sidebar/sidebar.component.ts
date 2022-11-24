import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private  js: JsService) {

  }

  ngOnInit() {
    this.js.jsActive()
  }
}
