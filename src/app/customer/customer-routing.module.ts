import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {CartsTableComponent} from './carts-table/carts-table.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {HomeComponent} from './home/home.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop',
    component: ProductListComponent
  },

  {
    path: 'checkout/:customer-id',
    component: CheckoutComponent
  },

  {
    path: 'cart/:cart-id',
    component: CartsTableComponent
  },

  {
    path: 'product/:product-id',
    component: ProductDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
