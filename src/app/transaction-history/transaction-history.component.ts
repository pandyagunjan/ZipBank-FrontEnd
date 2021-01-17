import { Component, OnInit } from '@angular/core';
import {TransactionHistoryService} from '../services/transaction/transaction-history.service';
import {Observable} from 'rxjs';
import {AccountHist} from './accountHist';
import {ActivatedRoute, Params} from '@angular/router';
import {TransactionHist} from './transactionHist';



@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  account: AccountHist;
  url: Params;
  history: TransactionHist[];

  constructor(private historyService: TransactionHistoryService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(url =>
      this.url = url);
    this.getHistory(this.url);
  }

  private getHistory(url: Params): void {
    this.historyService.fetchAccountHistory(url).subscribe(account => this.account = account);
    this.history = this.account.transactions;
  }
}
