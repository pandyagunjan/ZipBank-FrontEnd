import { Component, OnInit } from '@angular/core';
import {Transaction} from './transaction';
import {AccountListService} from '../services/account-list.service';
import {TransactionsService} from '../transactions.service';

export interface AccountNumbers{
  accountNumber: number;
  routingNumber: number;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {

  transaction: Transaction;
  amount: number;
  accounts: AccountNumbers[];
  from: AccountNumbers;
  to: AccountNumbers;

  constructor(private accountListService: AccountListService,
              private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.retrieveAccounts();
  }

  withdraw(): void{
    this.transactionService.withdraw(this.transaction);
  }

  deposit(): void{
    this.transactionService.deposit(this.transaction);
  }

  transfer(): void{
    this.transactionService.transfer(this.transaction);
  }

  setTransaction(): void{
    this.transaction.transactionAmmount = this.amount;
    this.accounts[0] = this.from;
    this.accounts[1] = this.to;
    this.transaction.accounts = this.accounts;
  }

  retrieveAccounts(): void{
    this.accountListService.retrieveAllAccounts(1).subscribe(
      response => {
        console.log(response);
        // @ts-ignore
        this.accounts = response; },
      error => console.log('couldn\'t get because', error)
    );
  }

}
