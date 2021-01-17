import { Component, OnInit } from '@angular/core';
import {Account} from '../list-accounts/list-accounts.component';
import {AccountListService} from '../services/account-list/account-list.service';
import {Router} from '@angular/router';
import {TransactionHistoryService} from '../services/transaction/transaction-history.service';

export class AccountHist{

  constructor(public accountNumber: string,
              public balance: string,
              public transactions: TransactionHist[]) {
  }
}

export class TransactionHist {

  constructor(public transactionDescription: string,
              public transactionAmount: string,
              public transactionBalance: string,
              public transactionDate: string) {}
}
@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  account: Account;
  url: string;

  constructor(private router: Router, public listService: AccountListService, public accountService: TransactionHistoryService) {
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.getAccount(this.url);
  }

  private getAccount(url: string): void {
    this.accountService.fetchAccount(url).subscribe(account => {
        this.account = account;
      }
    );
  }
}
