import { Component, OnInit } from '@angular/core';
import {TransactionHistoryService} from '../services/transaction/transaction-history.service';
import {Observable} from 'rxjs';
// import {AccountHist} from './accountHist';
import {ActivatedRoute, Params, Router} from '@angular/router';
// import {TransactionHist} from './transactionHist';

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
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  account: AccountHist;
  url: string;
  history: TransactionHist[];

  constructor(private historyService: TransactionHistoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.url = this.router.url;
    console.log(this.url);
    this.getHistory(this.url);
  }

  private getHistory(url: string): void {
    this.historyService.fetchAccount(url).subscribe(account =>
    {this.history = account.transactions;
     console.log(this.history); }
    );
  }
}
