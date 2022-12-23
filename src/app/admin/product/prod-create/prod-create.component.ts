import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-prod-create',
  templateUrl: './prod-create.component.html',
  styleUrls: ['./prod-create.component.css']
})

export class ProdCreateComponent implements OnInit {

  constructor() {
    $( document ).ready( function () {
      $('#compose-textarea').summernote();
    });
  }

  ngOnInit() {
  }

}
