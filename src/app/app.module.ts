import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import {LogoutComponent} from './logout/logout.component';
import {AddressComponent} from './address/address.component';
import {EmailComponent} from './email/email.component';
import {PhoneComponent} from './phone/phone.component';
import {DeleteCustomerComponent} from './delete-customer/delete-customer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {HttpInterceptService} from './services/http-intercept/http-intercept.service';
import { FooterComponent } from './footer/footer.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListAccountsComponent,
    RegistrationComponent,
    ProfileComponent,
    AccountPageComponent,
    LogoutComponent,
    AddressComponent,
    EmailComponent,
    PhoneComponent,
    DeleteCustomerComponent,
    CreateaccountComponent,
    FooterComponent

  ],
  entryComponents: [AddressComponent, EmailComponent, PhoneComponent, CreateaccountComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
