import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {ProdListComponent} from './product/prod-list/prod-list.component';
import {ProdCreateComponent} from './product/prod-create/prod-create.component';
import {OptionListComponent} from './option/option-list/option-list.component';
import {CategoryListComponent} from './categories/category-list/category-list.component';




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
    path: 'option/list',
    component: OptionListComponent
  },
  {
    path: 'category/list',
    component: CategoryListComponent
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
