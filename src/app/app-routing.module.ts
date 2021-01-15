import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';

import { RegistrationComponent} from './registration/registration.component';
import { AccountPageComponent } from './account-page/account-page.component';
import {ListAccountsComponent} from './list-accounts/list-accounts.component';
import { ProfileComponent} from './profile/profile.component';
import { AddressComponent} from './address/address.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'accountpage', component: AccountPageComponent},
  {path: 'myaccount', component: ListAccountsComponent},
  {path: 'openaccount', component: RegistrationComponent},
  //{path: 'myaccount/:url', component: AccountPageComponent},
  {path: 'myaccount/profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
