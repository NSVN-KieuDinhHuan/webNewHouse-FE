import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() {
    $( document ).ready(function() {
      var proCata = $('.amado-pro-catagory');
      var singleProCata = ".single-products-catagory";

      if ($.fn.imagesLoaded) {
        proCata.imagesLoaded(function () {
          proCata.isotope({
            itemSelector: singleProCata,
            percentPosition: true,
            masonry: {
              columnWidth: singleProCata
            }
          });
        });
      }
    });
  }

  ngOnInit() {
    $( document ).ready(function() {
      var proCata = $('.amado-pro-catagory');
      var singleProCata = ".single-products-catagory";

      if ($.fn.imagesLoaded) {
        proCata.imagesLoaded(function () {
          proCata.isotope({
            itemSelector: singleProCata,
            percentPosition: true,
            masonry: {
              columnWidth: singleProCata
            }
          });
        });
      }
    });
  }
}
