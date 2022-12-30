import {Component, Input, OnInit} from '@angular/core';
import {JsService} from '../../../service/js.service';
import {Dish} from '../../../model/dish';
import {CartService} from '../../../service/cart/cart.service';
import {CartDetail} from '../../../model/cart-detail';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cartDetailDto:CartDetail[];
  cartLength: number=0;
  cartId:number;
  cartGroup:any=null;
  sidebarId='sider01'

  @Input() cartLengthChild = 0;
  constructor(private  js: JsService,
              private router: Router,
              private cartService: CartService,) {
    this.cartId= JSON.parse(sessionStorage.getItem("cartId"));
    this.getAllCartByCartGroupId();
  }
  getAllCartByCartGroupId() {
    if (this.cartId!=null) {
      this.cartService.getAllCartByCartGroupId(this.cartId).subscribe((res:CartDetail[]) => {
        if(res) {
         this.cartDetailDto = res;
         this.cartLengthChild=this.cartDetailDto.length;
        }
      });
    }
  }
  getCarGroupById(){
    this.cartService.getCartGroupById(this.cartId).subscribe((res) => {
      this.cartGroup = res;
    })
  }

  siderbarActive(id:string){
    $('#sider01').removeClass('')
    $('#sider02').removeClass('')
    $('#sider03').removeClass('')
    $('#sider04').removeClass('')
    $('#' + id).removeClass('').addClass('active');
    if(id=="sider01") {
    this.router.navigateByUrl('/newhouse');
    }
    if(id=="sider02") {
      this.router.navigateByUrl('/newhouse/shop0/');
    }
    if(id=="sider03") {
      this.router.navigateByUrl('/newhouse/shop/');
    }
    if(id=="sider04") {
      this.router.navigateByUrl('/newhouse/about/');
    }
  }
  ngOnInit() {
    this.js.jsActive()
  }
}
