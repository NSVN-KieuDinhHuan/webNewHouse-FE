import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardGuard} from './helper/auth-guard.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'newhouse',
    pathMatch: 'full'
  },
  {
    path: 'newhouse',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
