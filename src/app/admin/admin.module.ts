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



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    FooterComponent,
    ProdListComponent,
    ProdCreateComponent],
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
  ]
})
export class AdminModule { }
