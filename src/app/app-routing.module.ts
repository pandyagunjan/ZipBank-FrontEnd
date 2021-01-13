import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent} from './login/login.component';
import { AccountPageComponent } from './account-page/account-page.component';
import {ListAccountsComponent} from './list-accounts/list-accounts.component';
const routes: Routes = [
  {path: '', component: AccountPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'myaccount/all/:id', component: ListAccountsComponent},
  {path: 'myaccount/:url', component: AccountPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
