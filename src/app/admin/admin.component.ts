import {Component, OnInit} from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() {
    $(document ).ready( function () {
      $('#compose-textarea').val("hello");
    });
  }

  ngOnInit() {
  }



}
