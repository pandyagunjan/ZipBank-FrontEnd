import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import {HttpInterceptService} from './services/http-intercept/http-intercept.service';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListAccountsComponent,
    RegistrationComponent,
    ProfileComponent,
    AccountPageComponent,
    LogoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
