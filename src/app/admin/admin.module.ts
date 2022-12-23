import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SidebarComponent} from './share/sidebar/sidebar.component';
import {FooterComponent} from './share/footer/footer.component';
import { ProdListComponent } from './product/prod-list/prod-list.component';
import { ProdCreateComponent } from './product/prod-create/prod-create.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { OptionListComponent } from './option/option-list/option-list.component';
import { OptionCreateComponent } from './option/option-create/option-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    FooterComponent,
    ProdListComponent,
    ProdCreateComponent,
    OptionListComponent,
    OptionCreateComponent,
    CategoryListComponent,
    OrderListComponent],
  exports: [
    AdminComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgxSummernoteModule
  ]
})
export class AdminModule { }
