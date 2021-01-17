import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountPageComponent } from './account-page/account-page.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';

import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { HttpInterceptService} from './services/http-intercept/http-intercept.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmailComponent } from './email/email.component';
import { PhoneComponent } from './phone/phone.component';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';
import {LogoutComponent} from './logout/logout.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {TransactionHistoryComponent} from './transaction-history/transaction-history.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { FooterComponent } from './footer/footer.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';



// @ts-ignore
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
    TransactionsComponent,
    TransactionHistoryComponent,
    CreateaccountComponent,
    FooterComponent,
    DepositComponent,
    WithdrawComponent,
    TransferComponent

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
