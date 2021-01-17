import { Component, OnInit } from '@angular/core';
import {AccountListService } from '../services/account-list/account-list.service';
import {TransactionsService} from '../services/transaction/transactions.service';
import {ActivatedRoute, Params} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  transaction: FormGroup;
  url: Params;

  constructor(private accountListService: AccountListService,
              private transactionService: TransactionsService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<TransactionsComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.retrieveAccount();
    this.transaction = this.fb.group({
      amount: [, [Validators.required, Validators.pattern('^[0-9]$')]],
      accounts: this.fb.array([this.getAccountNumbers()])
    });
  }

  // tslint:disable-next-line:typedef
  get amount(){
    return this.transaction.get('amount');
  }

  // tslint:disable-next-line:typedef
  get accounts(){
    return this.transaction.controls.accounts as FormArray;
  }

  // tslint:disable-next-line:typedef
  get accountNumber(){
    return this.transaction.get('accountNumber');
  }

  // tslint:disable-next-line:typedef
  get routingNumber(){
    return this.transaction.get('routingNumber');
  }

  withdraw(): void{
    this.transactionService.withdraw(this.transaction, this.url);
  }

  deposit(): void{
    this.transactionService.deposit(this.transaction, this.url);
  }

  transfer(): void{
    this.transactionService.transfer(this.transaction, this.url);
  }

  private retrieveAccount(): void{
    this.route.params.subscribe(url =>
      this.url = url);
  }


  // tslint:disable-next-line:typedef
  private getAccountNumbers() {
    return this.fb.group({
      accountNumber: [, [Validators.required, Validators.pattern('^[0-9]$')]],
      routingNumber: [, [Validators.required, Validators.pattern('^[0-9]$')]]
    });
  }
}
