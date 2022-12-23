import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {ProdListComponent} from './product/prod-list/prod-list.component';
import {ProdCreateComponent} from './product/prod-create/prod-create.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProdListComponent
  },
  {
    path: 'create',
    component: ProdCreateComponent
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
