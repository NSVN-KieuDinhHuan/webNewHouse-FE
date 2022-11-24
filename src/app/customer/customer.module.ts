import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';

import { ProductListComponent } from './product/product-list/product-list.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {CartsTableComponent} from './carts-table/carts-table.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {CategoryComponent} from './share/category/category.component';
import {FooterComponent} from './share/footer/footer.component';
import {SearchComponent} from './share/search/search.component';
import {SidebarComponent} from './share/sidebar/sidebar.component';
import {NewsletterComponent} from './share/newsletter/newsletter.component';

@NgModule({
  declarations: [
    ProductListComponent,
    CheckoutComponent,
    CartsTableComponent,
    ProductDetailComponent,
    HomeComponent,
    CategoryComponent,
    FooterComponent,
    SearchComponent,
    SidebarComponent,
    NewsletterComponent
  ],
  exports: [
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
  ]
})
export class CustomerModule { }
