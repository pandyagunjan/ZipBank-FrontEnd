import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AccountListService} from '../services/account-list/account-list.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { CreateaccountComponent } from '../createaccount/createaccount.component';

export class Account {
  constructor(
    public id: number,
    public accountNumber: string,
    public routingNumber: string,
    public accountType: string,
    public balance: number,
    public dateOfOpening: Date,
    public interestRate: number,
    public encryptedUrl: string)
  {
  }
}
@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {
 accounts: Account[];
 message: string;
 url = 'http://localhost:8080/myaccount';

  constructor(public router: Router , public listService: AccountListService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  // tslint:disable-next-line:typedef
  get myAccounts(){
    return this.accounts;
  }

  // tslint:disable-next-line:typedef
  getAllAccounts()
  {
    this.listService.retrieveAllAccounts(this.url).subscribe(
      response => {
        console.log(response);
        // @ts-ignore
        this.accounts = response; },
    error => {
        this.message = error;
      }

    );
  }

  // tslint:disable-next-line:typedef
  navigateToAccount(encryptedUrl)
  {
    this.router.navigate(['myaccount', encryptedUrl]);
  }

  // tslint:disable-next-line:typedef
  createAccount()
  {
      this.dialog.open(CreateaccountComponent);
      this.dialog.afterAllClosed.subscribe(() => this.getAllAccounts()); // refreshes the page after update
  }
}
