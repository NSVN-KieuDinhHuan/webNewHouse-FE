import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {CartsTableComponent} from './carts-table/carts-table.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {HomeComponent} from './home/home.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {BestSaleComponent} from './best-sale/best-sale.component';
import {AboutCompannyComponent} from './about-companny/about-companny.component';
import {HistoryComponent} from './history/history.component';





const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop/:category-id',
    component: ProductListComponent
  },

  {
    path: 'checkout',
    component: CheckoutComponent
  },

  {
    path: 'cart',
    component: CartsTableComponent
  },

  {
    path: 'product/:product-id',
    component: ProductDetailComponent
  },
  {
    path: 'bestsale/:product-id',
    component: BestSaleComponent
  },
  {
    path: 'about',
    component: AboutCompannyComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
