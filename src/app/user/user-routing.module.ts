import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserEditComponent} from './user-edit/user-edit.component';


const routes: Routes = [
  {
    path: ':id',
    component: UserInfoComponent
  },
  {
    path: 'edit/:id',
    component: UserEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
