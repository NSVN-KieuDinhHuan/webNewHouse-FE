import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {ProdListComponent} from './product/prod-list/prod-list.component';
import {ProdCreateComponent} from './product/prod-create/prod-create.component';
import {OptionListComponent} from './option/option-list/option-list.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';
import {OptionGroupListComponent} from './option-group/option-group-list/option-group-list.component';
import {OptionCreateComponent} from './option/option-create/option-create.component';
import {OptionEditComponent} from './option/option-edit/option-edit.component';
import {OptionGroupCreateComponent} from './option-group/option-group-create/option-group-create.component';
import {CategoryCreateComponent} from './categories/category-create/category-create.component';
import {CategoryEditComponent} from './categories/category-edit/category-edit.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import {OrderListComponent} from './order/order-list/order-list.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'product/list',
    pathMatch: 'full'
  },
  {
    path: 'product/list',
    component: ProdListComponent
  },
  {
    path: 'product/create',
    component: ProdCreateComponent
  },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'option/list',
    component: OptionListComponent
  },
  {
    path: 'option/create',
    component: OptionCreateComponent
  },
  {
    path: 'option/edit/:option-id',
    component: OptionEditComponent
  },
  {
    path: 'option-group/list',
    component: OptionGroupListComponent
  },
  {
    path: 'option-group/create',
    component: OptionGroupCreateComponent
  },
  {
    path: 'category/list',
    component: CategoryListComponent
  },

  {
    path: 'category/create',
    component: CategoryCreateComponent
  },

  {
    path: 'category/edit/:id',
    component: CategoryEditComponent
  },
  {
    path: 'order/list',
    component: OrderListComponent
  },
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
