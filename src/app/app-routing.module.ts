import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent} from './login/login.component';

import { RegistrationComponent} from './registration/registration.component'
import { AccountPageComponent } from './account-page/account-page.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'openaccount', component: RegistrationComponent},
  {path: 'myaccount/something', component: AccountPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
