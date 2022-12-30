import {Directive, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';

import { ProductListComponent } from './product/product-list/product-list.component';
import {CartsTableComponent} from './carts-table/carts-table.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {CategoryComponent} from './share/category/category.component';
import {FooterComponent} from './share/footer/footer.component';
import {SearchComponent} from './share/search/search.component';
import {SidebarComponent} from './share/sidebar/sidebar.component';
import {NewsletterComponent} from './share/newsletter/newsletter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';

import { AboutCompannyComponent } from './about-companny/about-companny.component';
import { BestSaleComponent } from './best-sale/best-sale.component';
import { HistoryComponent } from './history/history.component';



@NgModule({
  declarations: [
    ProductListComponent,
    CartsTableComponent,
    ProductDetailComponent,
    HomeComponent,
    CategoryComponent,
    FooterComponent,
    SearchComponent,
    SidebarComponent,
    NewsletterComponent,
    CheckoutComponent,
    AboutCompannyComponent,
    BestSaleComponent,
    HistoryComponent,
  ],
  exports: [
    NewsletterComponent,
    SearchComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

  ]
})
export class CustomerModule { }
