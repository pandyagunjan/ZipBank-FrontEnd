import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardGuard} from './services/guards/auth-guard.guard';
import { LoginComponent} from './login/login.component';

import { RegistrationComponent} from './registration/registration.component';
import { AccountPageComponent } from './account-page/account-page.component';
import {ListAccountsComponent} from './list-accounts/list-accounts.component';

import {LogoutComponent} from './logout/logout.component';
import { ProfileComponent} from './profile/profile.component';
import { AddressComponent} from './address/address.component';
import {DeleteCustomerComponent} from './delete-customer/delete-customer.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accountpage', component: AccountPageComponent, canActivate: [AuthGuardGuard]},
  {path: 'myaccount', component: ListAccountsComponent, canActivate: [AuthGuardGuard]},
  {path: 'openaccount', component: RegistrationComponent},
  {path: 'myaccount/profile', component: ProfileComponent, canActivate: [AuthGuardGuard]},
  {path: 'myaccount/:url', component: AccountPageComponent, canActivate: [AuthGuardGuard]},
  {path: 'myaccount/profile/delete', component: DeleteCustomerComponent, canActivate: [AuthGuardGuard]},
  {path: 'myaccount/:url/transaction', component: TransactionsComponent, canActivate: [AuthGuardGuard]},
  {path: 'myaccount/:url', component: TransactionHistoryComponent, canActivate: [AuthGuardGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
