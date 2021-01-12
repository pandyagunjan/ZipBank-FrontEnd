import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard} from './services/guards/auth-guard.guard';

import { LoginComponent} from './login/login.component';
// import { AccountPageComponent} from './account-page/account-page.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'account', component: AccountPageComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
