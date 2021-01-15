import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';

import { RegistrationComponent} from './registration/registration.component';
import { AccountPageComponent } from './account-page/account-page.component';
import {ListAccountsComponent} from './list-accounts/list-accounts.component';
import { ProfileComponent} from './profile/profile.component';
import { AddressComponent} from './address/address.component';
import {DeleteCustomerComponent} from './delete-customer/delete-customer.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accountpage', component: AccountPageComponent},
  {path: 'myaccount', component: ListAccountsComponent},
  {path: 'openaccount', component: RegistrationComponent},
  {path: 'myaccount/profile', component: ProfileComponent},
  {path: 'myaccount/:url', component: AccountPageComponent},
  {path: 'myaccount/profile/delete', component: DeleteCustomerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
