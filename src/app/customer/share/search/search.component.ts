import { Component, OnInit } from '@angular/core';
import {JsService} from '../../../service/js.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(private  js: JsService) {

  }
  SearchForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.js.jsActive()
  }
  submit() {

  }

}
